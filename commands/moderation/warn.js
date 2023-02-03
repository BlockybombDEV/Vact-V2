const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const warnSchema = require('../../models/warningLog');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Manage warnings')
        .addSubcommand(subcommand => 
            subcommand
                .setName('add')
                .setDescription('Gives a warning to a user')
                .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to warn')
                .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName('reason')
                        .setDescription('The reason for the warn')
                        .setRequired(true))
        )
        .addSubcommand(subcommand => 
            subcommand
                .setName('remove')
                .setDescription('removes a warning from a user')
                .addStringOption(option =>
                    option
                        .setName('id')
                        .setDescription('id of warning to remove')
                        .setRequired(true))
        )
        .addSubcommand(subcommand => subcommand
            .setName('list')
            .setDescription('Shows the warning list for a user')
            .addUserOption(option => option
                .setName('user')
                .setDescription('User to show the warning list of')
                .setRequired(true)    
            )    
        )

        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'add') {
            const target = interaction.options.getUser('target');
            const member = interaction.guild.members.cache.get(target.id);
            const Reason = interaction.options.getString('reason') ?? 'No reason provided';
            const DBfailembed = new EmbedBuilder()

            warnSchema.findOne({ Guild: interaction.guildId }, async (err, data) => {
                if (!data) {
                    await warnSchema.create({
                        Guild: interaction.guildId,
                        Staff: interaction.user,
                        userId: member,
                        reason: Reason
                    });

                }  else if (data) {
                    warnSchema.deleteOne({ Guild: interaction.guildId});
                    await warnSchema.create({
                        Guild: interaction.guildId,
                        Staff: interaction.user,
                        userId: member,
                        reason: Reason
                    });

                }

                if (err) {
                    DBfailembed
                    .setDescription('❌ Something went wrong. *\n Join the support server to ask for help')
                    .setColor('Red')
                    .setTimestamp(Date.now())
                    interaction.reply({embeds: [DBfailembed]})
                
                }

            })
        

        
            //embeds
            const embed = new EmbedBuilder()
            .setTitle(`✅${target.tag} ${Warn}`)
            .setDescription(`Member: ${member} \n Reason: **${Reason}**`) // don't forget to add <@${member.name}> where it fits 
            .setColor('Green')

            const wrnEmbed = new EmbedBuilder()
            .setTitle(`you recieved a warning in ${interaction.guild.name}`)
            .setColor('#9048e2')
            .addFields(
                { name: "Reason", value: Reason },
                { name: "Staff member", value: `${interaction.user.tag}` }
            )
            .setTimestamp(Date.now())
        
            await interaction.reply({embeds: [embed], ephemeral: true})
            try {
                await target.send({ embeds:  [wrnEmbed] })
            } catch (exception) {
                console.log("I was unable to DM " + target.id);
            }
        } else if (interaction.options.getSubcommand() === 'remove') {
            const id = interaction.options.getString('id');
            const delEmbed = new EmbedBuilder().setDescription(`Warning ${id} has been removed from ${warning.userId}`).setColor('Green')
            try {
                await warnSchema.findByIdAndDelete(id)
                interaction.reply({embeds: [delEmbed]})
            } catch (exception) {
                interaction.reply({embeds: [
                    new EmbedBuilder()
                        .setTitle('❌ Could not remove this warning')
                        .setDescription('Check if this warning exists or if the id is correct')
                ]})
            }
        } else if (interaction.options.getSubcommand() === 'list') {
            const target = interaction.options.getUser('user');
            const member = interaction.guild.members.cache.get(target.id);

            const warnings = await warnSchema.find({
                Guild: interaction.guildId,
                userId: member,
            })

            let description = `**Warnings for ${target}**: \n\n`

            for (const warn of warnings) {
                description += `**ID:** ${warn._id}\n`
                description += `**Date:** ${warn.createdAt.toLocaleString()}\n`
                description += `**Staff:** ${warn.Staff}\n`
                description += `**Reason:** ${warn.reason}\n\n`
            }

            const embed = new EmbedBuilder().setDescription(description).setColor('Random').setThumbnail(member.displayAvatarURL())

            await interaction.reply({embeds: [embed]})
        }
    }
}