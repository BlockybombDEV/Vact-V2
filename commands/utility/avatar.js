const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get the avatar of an user.')
        .addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        if (user) return interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL()}`);
        return interaction.reply(`Your avatar: ${interaction.user.displayAvatarURL()}`);
    },
};