const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

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
        const commandName = interaction.options.getString('command');
        const commands = interaction.client.commands;

        if (!commandName) {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Commands')
                .setDescription(commands.map(command => command.data.name).join(', '));
            return await interaction.reply({ embeds: [embed] });
        }

        const command = commands.get(commandName);

        if (!command) {
            return await interaction.reply(`I couldn't find a command with the name \`${commandName}\``);
        }

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Command: ${command.data.name}`)
            .setDescription(command.data.description);

        if (command.data.options) {
            const fields = command.data.options.map(option => ({ name: `Option: ${option.name}`, value: option.description, inline: false }));
            embed.addFields(fields);
        }

        await interaction.reply({ embeds: [embed] });
    },
};