const { SlashCommandBuilder } = require('@discordjs/builders');

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
        let userId = interaction.options.getUser('target').id;
        let tokensPerHour = interaction.options.getInteger('tokensperhour');
        let messageCost = interaction.options.getInteger('messagecost');
        let linkCost = interaction.options.getInteger('linkcost');

        interaction.client.userParameters[userId] = { tokensPerHour, messageCost, linkCost };
        interaction.client.userTokens[userId] = tokensPerHour;

        await interaction.reply(`Set parameters for ${userId}: ${tokensPerHour} tokens per hour, ${messageCost} tokens per message, ${linkCost} tokens per link.`);
    },
};