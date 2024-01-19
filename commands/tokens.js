const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tokens')
        .setDescription('Check your remaining tokens'),
    async execute(interaction) {
        let userId = interaction.user.id;

        if (!interaction.client.userTokens[userId]) {
            return await interaction.reply(`You are not currently being monitored.`);
        }

        let tokensUsedForMessages = interaction.client.userParameters[userId].messageCost * (interaction.client.userMessageCount[userId] || 0);
        let tokensUsedForEmbeds = interaction.client.userParameters[userId].linkCost * (interaction.client.userEmbedCount[userId] || 0);

        await interaction.reply(`You have ${interaction.client.userTokens[userId]} tokens remaining. In your current session, you have used ${tokensUsedForMessages} tokens for messages and ${tokensUsedForEmbeds} tokens for embeds. A "session" refers to the period of time between when your tokens are reset to the maximum amount and when they are reset again. In the current configuration, a session lasts for one hour.`);
    },
};