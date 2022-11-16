const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a member')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to kick')
                .setRequired(true))
            .addStringOption(option =>
                option
                .setName('reason')
                .setDescription('The reason for the ban'))
            .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
            .setDMPermission(false),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';
        
        const embed = new EmbedBuilder().setDescription(`Kicked **${target.username}** 

        **reason**: ${reason}`).setTitle('Successfully kicked').setColor('Green')

        await interaction.reply({ embeds: [embed]})
        await interaction.guild.members.kick(target);
    }
}