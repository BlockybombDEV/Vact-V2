const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChannelType } = require('discord.js');
const logSchema = require('../../Models/Logs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-logs')
        .setDescription('Set a channel for logs')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addChannelOption(option => option
            .setName('channel')
            .setDescription('Channel for the logs')
            .setRequired(true)
            
        ),
    async execute(interaction) {
        const { guildId } = interaction;

        const logChannel = interaction.options.getChannel('channel');
        const embed = new EmbedBuilder()

        logSchema.findOne({ Guild: guildId }, async (err, data) => {
            if (!data) {
                await logSchema.create({
                    Guild: guildId,
                    Channel: logChannel.id
                });

                embed.setDescription(`✅ Succesfully set the logs channel to <#${logChannel.id}>`)
                    .setColor('Green')
                    .setTimestamp(Date.now())
            } else if (data) {
                logSchema.deleteOne({ Guild: guildId});
                await logSchema.create({
                    Guild: guildId,
                    Channel: logChannel.id
                });

                embed.setDescription(`✅ Changed logs channel to <#${logChannel}>`)
                    .setColor('Orange')
                    .setTimestamp(Date.now());
            }

            if (err) {
                embed.setDescription('❌ Something went wrong. *\n Join the support server to ask for help')
                .setColor('Red')
                .setTimestamp(Date.now())
            }

            return interaction.reply({ embeds: [embed], ephemeral: true})
        })
            
    }
}