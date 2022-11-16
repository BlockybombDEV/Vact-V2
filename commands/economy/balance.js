const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { User } = require("../../utils/schemas")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check your or another user's balance")
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("Person whose balance you want to check")
    ),
    async execute(interaction) {
        const user = interaction.options.getUser("user") || interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

        const balanceEmbed = new EmbedBuilder().setTitle(`${user.username}'s balance`).setDescription('Note: wallet and bank details of requested user').setColor('Yellow').setThumbnail(user.displayAvatarURL()).addFields({ name: "• Wallet", value: `**\` ${userData.wallet} 💎 \`**`, inline: true }, {name: "• Bank", value: `**\` ${userData.bank} 💎 \`**`, inline: true })

        return interaction.reply({
            embeds: [ balanceEmbed ]
        })
    }
}