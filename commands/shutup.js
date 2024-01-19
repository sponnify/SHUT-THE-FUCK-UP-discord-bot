const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('./logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shutup')
        .setDescription('Set the parameters for a user')
        .addUserOption(option => 
            option.setName('target')
            .setDescription('The user to set parameters for')
            .setRequired(true)
        )
        .addIntegerOption(option => 
            option.setName('tokensperhour')
            .setDescription('The number of tokens the user gets per hour')
            .setRequired(true)
        )
        .addIntegerOption(option => 
            option.setName('messagecost')
            .setDescription('The cost of sending a message')
            .setRequired(true)
        )
        .addIntegerOption(option => 
            option.setName('linkcost')
            .setDescription('The cost of sending a link')
            .setRequired(true)
        ),
    async execute(interaction) {
        try {
            if (!interaction.member.permissions.has('ADMINISTRATOR')) {
                return await interaction.reply('You do not have permission to use this command.');
            }

            let userId = interaction.options.getUser('target').id;
            let tokensPerHour = interaction.options.getInteger('tokensperhour');
            let messageCost = interaction.options.getInteger('messagecost');
            let linkCost = interaction.options.getInteger('linkcost');

            interaction.client.userParameters[userId] = { tokensPerHour, messageCost, linkCost };
            interaction.client.userTokens[userId] = tokensPerHour;

            await interaction.reply(`Set parameters for ${userId}: ${tokensPerHour} tokens per hour, ${messageCost} tokens per message, ${linkCost} tokens per link.`);
            logger.info(`'shutup' command executed by ${interaction.user.tag}, parameters set for user: ${userId}`);
        } catch (error) {
            logger.error(`Error executing 'shutup' command: ${error}`);
            await interaction.reply('There was an error executing the command.');
        }
    },
    cooldown: 5, // Cooldown in seconds
};