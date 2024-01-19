# SHUT THE FUCK UP BOT

This repository contains the code for a Discord bot that manages user interactions and token usage. If you have that one friend that constantly spams embeds and annoys everyone in the server, this bot is for you.

The bot is designed to punish users that regularly send embeds (think reaction gifs and shit). It monitors user messages and deducts tokens based on the content and type of message. Administrators can set parameters for individual users, such as the number of tokens per hour, message cost, and link cost. Additionally, administrators can ignore or unignore specific channels for bot interactions. The bot also provides commands for users to check their remaining tokens and for administrators to manage the bot's behavior.

## Features
- The bot monitors user messages and deducts tokens based on the content and type of message.
- It allows administrators to set parameters for individual users, such as the number of tokens per hour, message cost, and link cost.
- Administrators can also ignore or unignore specific channels for bot interactions.

## How It Works
The bot's main functionality is implemented in the `bot.js` file, where it initializes the Discord client, sets up commands, and handles events such as message creation and bot readiness. The `events/messageCreate.js` file contains the logic for processing user messages, deducting tokens, and handling user timeouts.

## Bot Commands
- `/help`: List all commands or info about a specific command
- `/tokens`: Check your remaining tokens
- `/shutup`: Set the parameters for a user
- `/deshutup`: Remove a user from being monitored
- `/ignorechannel`: Set a channel to be ignored by the bot
- `/unignorechannel`: Remove a channel from being ignored by the bot

For more details on each command, refer to the respective command files in the [commands](file:///y%3A/Documents/Discord%20Bots/SHUT%20THE%20FUCK%20UP%20KEENAN/bot.js#8%2C8-8%2C8) directory.

## Events
The bot utilizes various events to handle user interactions, such as [messageCreate](file:///y%3A/Documents/Discord%20Bots/SHUT%20THE%20FUCK%20UP%20KEENAN/bot.js#26%2C12-26%2C12) for processing user messages and [ready](file:///y%3A/Documents/Discord%20Bots/SHUT%20THE%20FUCK%20UP%20KEENAN/bot.js#24%2C14-24%2C14) for bot initialization.

## Discord Application Configuration

Visit https://discord.com/developers/applications to set one up. Remember to keep the generated Bot Token as you will need it later.

### Generate Invite URL

After you have created your application you will need to invite the Bot to a server. You can do this at your Discord Application screen:

- Click `OAuth2` in the menu
- Click `URL Generator`
- Check the `bot`, and `applications.commands` scope checkboxes.
- Check all the necessary permission checkboxes listed below.

### Required Bot Permissions

General Permissions: Administrator

### Invite Bot to Your Server

- Copy the generated URL
- Paste the URL into your browser
- Select your server
- Click continue
- Click authorize
- All done!

## Setup

1. Clone the repository.
2. Run `npm install` to install the dependencies. If you haven't already, you'll need to install Node.js and npm (which comes with Node.js). You can download them from the official Node.js website.
3. Copy the `.env.example` file to a new file named `.env` in the root directory.
4. In the `.env` file, replace `bot-token` with your actual bot token and `client-id` with your actual client ID.
5. Run `node index.js` to start the bot.

Or if you're using a terminal:

```bash
git clone [repository-url]
cd [project-directory-name]
npm install
cp .env.example .env
nano .env
node index.js
```

## Known Issues

- Please refer to the [Issues](https://github.com/your-repo/your-bot/issues) section of the repository for known issues and ongoing work.

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[GPL](https://choosealicense.com/licenses/gpl-3.0/)