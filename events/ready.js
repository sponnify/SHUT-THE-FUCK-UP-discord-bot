module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    });

    setInterval(() => {
        for (let userId in client.userTokens) {
            let parameters = client.userParameters[userId];

            if (!parameters) continue;

            client.userTokens[userId] += parameters.tokensPerHour;
        }
    }, 60 * 60 * 1000);
};