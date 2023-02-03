const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { User } = require("../../utils/schemas")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('Look at your inventory'),
    async execute(interaction) {
        const user = interaction.member.user
        const fail = new EmbedBuilder().setDescription(`❌ Usage of commands is restricted to <#${Restrictedchannel.Channel}>`).setColor('Grey')
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
        embed = new EmbedBuilder().setDescription(userData.inventory).setColor('Random').setTitle(`${user.username}'s inventory`)

        await interaction.reply({embeds: [embed]})
        
    }
}