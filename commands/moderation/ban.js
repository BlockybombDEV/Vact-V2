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
        const member = interaction.guild.members.cache.get(target.id);
        const Reason = interaction.options.getString('reason') ?? 'No reason provided';
        
        const FailEmbed = new EmbedBuilder()
        .setTitle("❌ Could not ban target!")
        .setColor('Red')
        
        const embed = new EmbedBuilder()
        .setDescription(`✅<@${target.id}> has been banned*\n Reason: **${Reason}**`) // don't forget to add <@${target.id}> where it fits 
        .setColor('#9048e2')

        const BanEmbed = new EmbedBuilder()
        .setTitle(`You have been banned from ${interaction.guild.name}`)
        .setColor('#9048e2')
        .addFields(
            { name: "Reason", value: Reason },
            { name: "Banned by", value: `${interaction.user.tag}` }
        )
        .setTimestamp(Date.now())

        try {
            await interaction.guild.bans.create(target.id, [{ reason: [Reason] }])

            await interaction.reply({ embeds: [embed], ephemeral: true })
        } catch(err) {
            console.log(err);
            interaction.reply({embeds: [FailEmbed]})
        }
        
        try {
            await target.send({ embeds: [BanEmbed] })
        } catch (exception) {
            console.log("I was unable to DM " + target.id);
        }
    }
}