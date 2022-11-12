const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { User } = require("../utils/schemas")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("withdraw")
    .setDescription("Withdraw your bank money to wallet")
    .addNumberOption(
        option => option
        .setName("amount")
        .setDescription("Amount to withdraw")
        .setRequired(true)
        .setMinValue(100) //should be more than 100 coins
    ),
    async execute(interaction) {
        const user = interaction.member.user,
        amount = interaction.options.getNumber("amount")
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
        embed = new EmbedBuilder().setColor('Yellow')

        if (userData.bank < amount) return interaction.reply({
            embeds: [ embed.setDescription(`💰 You need \` ${amount - userData.bank} 💎 \` more in your bank account to withdraw money`) ],
            ephemeral: true
        })

        userData.bank -= amount
        userData.wallet += amount
        userData.save()

        return interaction.reply({
            embeds: [ embed.setDescription(`✅ You have withdrawn \` ${amount} 💎 \` amount from your bank account`) ]
        })
    }
}