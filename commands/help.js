const { SlashCommandBuilder, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const logger = require('./logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .addAlias('h') // Added alias
        .addAlias('commands') // Added alias
        .setDescription('List all commands or info about a specific command')
        .addStringOption(option => 
            option.setName('command')
            .setDescription('The command to get info about')
            .setRequired(false)
        ),
    async execute(interaction) {
        try {
            const commandName = interaction.options.getString('command');
            const commands = interaction.client.commands;

            if (!commandName) {
                // Split the commands into groups of 10
                const commandGroups = commands.map(command => command.data.name).reduce((groups, command, index) => {
                    const groupIndex = Math.floor(index / 10);
                    if (!groups[groupIndex]) {
                        groups[groupIndex] = [];
                    }
                    groups[groupIndex].push(command);
                    return groups;
                }, []);

                // Create a row of buttons for pagination
                const row = new MessageActionRow().addComponents(
                    new MessageButton()
                        .setCustomId('previous')
                        .setLabel('Previous')
                        .setStyle('PRIMARY')
                        .setDisabled(true), // Disable the 'previous' button on the first page
                    new MessageButton()
                        .setCustomId('next')
                        .setLabel('Next')
                        .setStyle('PRIMARY')
                );

                // Send the first page
                const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Commands')
                    .setDescription(commandGroups[0].join(', '))
                    .addField('About the Bot', 'This bot is designed to monitor user activity and manage user interactions in a Discord server. It uses a token system to track user messages and provides several commands for admins and users.');
                await interaction.reply({ embeds: [embed], components: [row] });

                // Listen for button clicks
                const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 60000 });

                let pageIndex = 0;
                collector.on('collect', async (buttonInteraction) => {
                    // Ensure the button click is from the original user
                    if (buttonInteraction.user.id !== interaction.user.id) {
                        return await buttonInteraction.reply({ content: 'You did not initiate this command.', ephemeral: true });
                    }

                    if (buttonInteraction.customId === 'previous') {
                        if (pageIndex === 0) {
                            return await buttonInteraction.reply({ content: 'There are no previous pages.', ephemeral: true });
                        }
                        pageIndex--;
                    } else if (buttonInteraction.customId === 'next') {
                        if (pageIndex === commandGroups.length - 1) {
                            return await buttonInteraction.reply({ content: 'There are no more pages.', ephemeral: true });
                        }
                        pageIndex++;
                    }

                    // Update the embed with the new page
                    const newEmbed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Commands')
                        .setDescription(commandGroups[pageIndex].join(', '))
                        .addField('About the Bot', 'This bot is designed to monitor user activity and manage user interactions in a Discord server. It uses a token system to track user messages and provides several commands for admins and users.');

                    // Update the buttons
                    const newRow = new MessageActionRow().addComponents(
                        new MessageButton()
                            .setCustomId('previous')
                            .setLabel('Previous')
                            .setStyle('PRIMARY')
                            .setDisabled(pageIndex === 0),
                        new MessageButton()
                            .setCustomId('next')
                            .setLabel('Next')
                            .setStyle('PRIMARY')
                            .setDisabled(pageIndex === commandGroups.length - 1)
                    );

                    await buttonInteraction.update({ embeds: [newEmbed], components: [newRow] });
                });

                collector.on('end', () => {
                    // Remove the buttons when the collector ends
                    interaction.editReply({ components: [] });
                });
            } else {
                const command = commands.get(commandName);

                if (!command) {
                    return await interaction.reply(`I couldn't find a command with the name \`${commandName}\``);
                }

                const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Command: ${command.data.name}`)
                    .setDescription(command.data.description)
                    .addField('Usage', `/${command.data.name} ${command.data.options.map(option => `<${option.name}>`).join(' ')}`);

                if (command.data.options) {
                    const fields = command.data.options.map(option => ({ name: `Option: ${option.name}`, value: option.description, inline: false }));
                    embed.addFields(fields);
                }

                await interaction.reply({ embeds: [embed] });
            }
            logger.info(`'help' command executed by ${interaction.user.tag}, command info requested: ${commandName}`);
        } catch (error) {
            logger.error(`Error executing 'help' command: ${error}`);
            await interaction.reply('There was an error executing the command.');
        }
    },
    cooldown: 3, // Cooldown in seconds
};