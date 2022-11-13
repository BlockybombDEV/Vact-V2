const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { User } = require("../utils/schemas")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("give")
    .setDescription("Give money to an user")
    .addNumberOption(
        option => option
        .setName("amount")
        .setDescription("Amount to give")
        .setRequired(true)
        .setMinValue(10) //should be more than 100 coins
    )
    .addUserOption(
        option => option
        .setName('user')
        .setDescription('User to give money to')
        .setRequired(true)
    ),
    async execute(interaction) {
        const user = interaction.member.user
        const reciever = interaction.options.getUser('user')
        RecieverData = await User.findOne({ id: reciever.id }) || new User({ id: reciever.id }),
        amount = interaction.options.getNumber("amount")
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
        embed = new EmbedBuilder().setColor('Yellow')

        if (userData.bank < amount) return interaction.reply({
            embeds: [ embed.setDescription(`💰 You need \` ${amount - userData.bank} 💎 \` more in your bank to give the amount of money`) ],
            ephemeral: true
        })

        userData.bank -= amount
        RecieverData.bank += amount
        userData.save()
        RecieverData.save()

        return interaction.reply({
            embeds: [ embed.setDescription(`✅ You have deposited \` ${amount} 💎 \` amount into ${reciever}'s bank account`) ]
        })
    }
}