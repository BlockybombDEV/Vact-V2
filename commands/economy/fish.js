const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { User } = require("../../utils/schemas")
const prettyMilliseconds = require('pretty-ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fish")
        .setDescription("Fish for fish"),
    async execute(interaction) {
        const user = interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        const embed = new EmbedBuilder().setColor('Yellow')

        if (userData.cooldowns.fish > Date.now())
            return interaction.reply({
                embeds: [
                    embed.setDescription(`⌛ Stop fishing so much, wait for **\`${prettyMilliseconds(userData.cooldowns.fish - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}\`**`)
                ],
                ephemeral: true
            })

        const amount = Math.floor((Math.round(10 / (Math.random() * 50 + 1)) * 17) / 2)

        if (amount <= 5) {
            userData.cooldowns.fish = Date.now() + (1000 * 30)
            userData.save()

            return interaction.reply({
                embeds: [embed.setDescription("🥺 You got nothing this time, maybe try hard next time?")],
            })
        }

        userData.wallet += amount
        userData.cooldowns.fish = Date.now() + (1000 * 30)
        userData.save()

        return interaction.reply({
            embeds: [
                embed.setDescription(`🎣 Oh my! You catched a fish worth \` ${amount} 💎 \``)
            ]
        })
    }
}