const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a member')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to ban')
                .setRequired(true))
            .addStringOption(option =>
                option
                .setName('reason')
                .setDescription('The reason for the ban'))
            .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
            .setDMPermission(false),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';
        
        const embed = new EmbedBuilder().setDescription(`Banned ${target.username} 
        
        **reason**: ${reason}`).setTitle('Successfully banned').setColor('Green')

        await interaction.reply({ embeds: [embed]})
    }
}