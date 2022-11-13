const { SlashCommandBuilder, EmbedBuilder, Client } = require('discord.js')

const client = new Client({ intents: ['Guilds','GuildMembers'] });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with the current ping'),
    async execute(interaction) {
        const ping = new EmbedBuilder()
        .setColor('Red')
        .setTitle('PONG')
        .addFields(
            {name: 'Websocket ping', value: `${client.ws.ping - Date.now() }`}
        )

        await interaction.reply({ embeds: [ping] });
    }
}