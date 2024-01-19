module.exports = async (client, message) => {
    try {
        if (message.author.bot) return;

        // Ignore messages from ignored channels
        if (client.ignoredChannels[message.channel.id]) return;

        let userId = message.author.id;
        if (!client.userTokens[userId]) {
            client.userTokens[userId] = 50; // Default value
            client.userParameters[userId] = { tokensPerHour: 50, messageCost: 1, linkCost: 25 }; // Default values
        }

        const urlRegex = /(https?:\/\/[^\s]+)/g;
        let tokenCost = urlRegex.test(message.content) || message.embeds.length > 0 ? client.userParameters[userId].linkCost : client.userParameters[userId].messageCost;
        client.userTokens[userId] -= tokenCost;

        // Check if the bot was mentioned in the message
        if (message.mentions.has(client.user)) {
            console.log(`Bot was mentioned by ${message.author.username}`);
            message.reply('SHUT UP!!!!!!!!');
        } else {
            console.log(`Bot was not mentioned in the message by ${message.author.username}`);
        }

        if (message.embeds.length > 0) {
            message.channel.send(`Detected an embed from ${message.author.username}. Deducting ${client.userParameters[userId].linkCost} tokens.`);
        }

        if (client.userTokens[userId] < 0) {
            try {
                await message.member.timeout(60 * 60 * 1000); // Timeout for one hour
                client.userTokens[userId] = client.userParameters[userId].tokensPerHour; // Reset tokens after timeout
                message.channel.send(`User ${message.author.username} has run out of tokens and has been timed out for one hour.`);
            } catch (error) {
                console.error(`Failed to timeout member: ${error}`);
            }
        }
    } catch (error) {
        console.error(`Error in messageCreate event: ${error}`);
    }
};