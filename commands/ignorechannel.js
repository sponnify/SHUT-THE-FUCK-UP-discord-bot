const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ignorechannel')
        .setDescription('Set a channel to be ignored by the bot')
        .addChannelOption(option => 
            option.setName('target')
            .setDescription('The channel to ignore')
            .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return await interaction.reply('You do not have permission to use this command.');
        }

        let channel = interaction.options.getChannel('target');

        interaction.client.ignoredChannels[channel.id] = true;

        await interaction.reply(`Channel ${channel.name} will be ignored by the bot.`);
    },
};