const { Client, Collection, Events, ActivityType, EmbedBuilder, GuildMember, Embed, InteractionCollector, Partials } = require('discord.js');

const client = new Client({ 
    intents: ['Guilds','GuildMembers','DirectMessages'],
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