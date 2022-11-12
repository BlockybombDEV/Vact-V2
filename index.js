const fs = require('node:fs');
const path = require('node:path')
const { Client, Collection, Events, ActivityType } = require('discord.js');
require('dotenv').config()

const client = new Client({ intents: ['Guilds','GuildMembers'] });

client.commands = new Collection();

client.once(Events.ClientReady, c => {
    client.user.setActivity(`${client.guilds.cache.size} servers`, { type: ActivityType.Watching});
    console.log(`Bot is Online. Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
});

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}


client.login(process.env.TOKEN)