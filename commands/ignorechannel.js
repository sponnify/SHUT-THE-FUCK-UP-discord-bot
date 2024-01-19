const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('./logger');

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
        try {
            if (!interaction.member.permissions.has('ADMINISTRATOR')) {
                return await interaction.reply('You do not have permission to use this command.');
            }

            let channel = interaction.options.getChannel('target');
            if (!channel) {
                return await interaction.reply('Invalid channel specified.');
            }

            interaction.client.ignoredChannels[channel.id] = true;

            await interaction.reply(`Channel ${channel.name} will be ignored by the bot.`);
            logger.info(`'ignorechannel' command executed by ${interaction.user.tag}, channel ignored: ${channel.name}`);
        } catch (error) {
            logger.error(`Error executing 'ignorechannel' command: ${error}`);
            await interaction.reply('There was an error executing the command.');
        }
    },
    cooldown: 5, // Cooldown in seconds
};