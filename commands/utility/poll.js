const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Creates a poll')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addStringOption((option) => option
            .setName('title')
            .setDescription('Set the title of the poll')
            .setRequired(true)
        )
        .addStringOption((option) => option
            .setName('description')
            .setDescription('Sets the description for the poll')
            .setRequired(true)
        )
        .addChannelOption((option) => option
            .setName('channel')
            .setDescription('The channel to send the poll in')
            .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
            .setRequired(true)
        ),
    async execute(interaction) {

        const channel = interaction.options.getChannel('channel');
        const description = interaction.options.getString('description');
        const title = interaction.options.getString('title');

        const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setDescription(description)
            .setTitle(title)
            .setTimestamp();

        try {
            const m = await channel.send({embeds: [embed] });
            await m.react('✅');
            await m.react('❌');
            await interaction.reply({ content: `The poll was succesfully sent in ${channel}`, ephemeral: true});
        } catch (err) {
            console.log(err);
        }
    }
}