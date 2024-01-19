const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const token = process.env.TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.commands = new Collection();
client.userTokens = {};
client.userParameters = {};
client.ignoredChannels = {}; // Initialize ignoredChannels

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (command.data) {
        client.commands.set(command.data.name, command);
    } else {
        console.error(`Command file ${file} does not export data.`);
    }
}

client.once('ready', () => require('./events/ready')(client));

client.on('messageCreate', async message => {
    try {
        require('./events/messageCreate')(client, message);
    } catch (error) {
        console.error(error);
    }
});

client.login(token);