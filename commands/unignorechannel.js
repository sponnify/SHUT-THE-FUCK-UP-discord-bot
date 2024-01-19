const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unignorechannel')
        .setDescription('Remove a channel from being ignored by the bot')
        .addChannelOption(option => 
            option.setName('target')
            .setDescription('The channel to remove from ignore list')
            .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return await interaction.reply('You do not have permission to use this command.');
        }

        let channel = interaction.options.getChannel('target');

        if (!interaction.client.ignoredChannels[channel.id]) {
            return await interaction.reply(`Channel ${channel.name} is not currently being ignored.`);
        }

        delete interaction.client.ignoredChannels[channel.id];

        await interaction.reply(`Channel ${channel.name} will no longer be ignored by the bot.`);
    },
};