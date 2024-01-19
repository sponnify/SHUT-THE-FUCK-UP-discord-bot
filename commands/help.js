const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const logger = require('./logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
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
                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Commands')
                    .setDescription(commands.map(command => command.data.name).join(', '))
                    .addField('About the Bot', 'This bot is designed to monitor user activity and manage user interactions in a Discord server. It uses a token system to track user messages and provides several commands for admins and users.');
                await interaction.reply({ embeds: [embed] });
            } else {
                const command = commands.get(commandName);

                if (!command) {
                    return await interaction.reply(`I couldn't find a command with the name \`${commandName}\``);
                }

                const embed = new EmbedBuilder()
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