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
        const victim = interaction.options.getUser('user')
        victimData = await User.findOne({ id: victim.id }) || new User({ id: victim.id }),
        amount = interaction.options.getNumber("amount")
        userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
        embed = new EmbedBuilder().setColor('Yellow')

        if (userData.cooldowns.steal > Date.now())
            return interaction.reply({
                embeds: [
                    embed.setDescription(`⌛ Stop trying to steal so much, wait for **\`${prettyMilliseconds(userData.cooldowns.steal - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}\`**`)
                ],
                ephemeral: true
            })


        if (userData.wallet < 50) return interaction.reply({
            embeds: [ embed.setDescription(`💰 You need \` 50 💎 \` more in your wallet to rob an user`) ],
            ephemeral: true
        })

        const amount = Math.floor((Math.round(10 / (Math.random() * 10 + 1)) * 10) / 2)

        if (amount <= 5) {
            userData.cooldowns.steal = Date.now() + (1000 * 90)
            userData.save()

            return interaction.reply({
                embeds: [embed.setDescription(`🥺 You failed to rob ${victim}, maybe try hard next time?`)],
            })
        }

        userData.wallet += amount
        victimData.wallet -= amount
        userData.save()
        victimData.save()

        return interaction.reply({
            embeds: [ embed.setDescription(`✅ You have stolen \` ${amount} 💎 \` from ${victim}`) ]
        })
    }
}