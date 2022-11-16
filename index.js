const fs = require('node:fs');
const path = require('node:path')
const { Client, Collection, Events, ActivityType, EmbedBuilder, GuildMember, Embed, InteractionCollector, Partials } = require('discord.js');
const mongoose = require('mongoose')
import('pretty-ms')
require('dotenv').config()

const {loadCommands} = require('./Handlers/commandHandler')
const {loadEvents} = require('./Handlers/eventHandler')

const client = new Client({ 
    intents: ['Guilds','GuildMembers','DirectMessages'],
});


client.commands = new Collection();

client.once(Events.ClientReady, c => {
    client.user.setActivity(`/help | Serving ${client.guilds.cache.size} servers`, { type: ActivityType.Playing});
    console.log(`Bot is Online. Logged in as ${c.user.tag}`);
});

client.on('ready', () => {
    const Guilds = client.guilds.cache.map(guild => guild.name);
    console.log(`Vact is currently in
     ${Guilds}`)
})

client.on(Events.InteractionCreate, interaction => {
    if (!interaction.isButton()) return;
    console.log(interaction);
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

client.login(process.env.TOKEN).then(() => mongoose.connect(process.env.MONGO_URI)).then(() => {
    loadEvents(client);
    loadCommands(client);
});