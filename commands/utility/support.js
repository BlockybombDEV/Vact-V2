const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

const embed = new EmbedBuilder().setDescription('https://discord.gg/CEJQR3Etms').setTitle('Support Server').setColor('Green')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Get a link to the support server'),
    async execute(interaction) {
        await interaction.reply('Sent you the Server link in DMs', interaction.user.send({ embeds: [embed] }));
    },
}