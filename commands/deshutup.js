const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('./logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deshutup')
        .setDescription('Remove a user from being monitored')
        .addUserOption(option => 
            option.setName('target')
            .setDescription('The user to remove from monitoring')
            .setRequired(true)
        ),
    async execute(interaction) {
        try {
            let user = interaction.options.getUser('target');
            let userId = user.id;

            if (!interaction.client.userTokens[userId]) {
                return interaction.reply(`User ${user.username} is not currently being monitored.`);
            }

            delete interaction.client.userTokens[userId];
            delete interaction.client.userParameters[userId];

            await interaction.reply(`User ${user.username} has been removed from monitoring.`);
            try {
                await user.send(`You have been removed from monitoring in ${interaction.guild.name}.`);
            } catch (error) {
                logger.error(`Error sending DM to user: ${error}`);
            }
        } catch (error) {
            logger.error(`Error executing 'deshutup' command: ${error}`);
            await interaction.reply('There was an error executing the command.');
        }
    },
};