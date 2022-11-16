const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js");
const prettyMilliseconds = require('pretty-ms');
const { User } = require("../../utils/schemas")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Get your daily money"),
    async execute(interaction) {
        const user = interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        const embed = new EmbedBuilder().setColor('Yellow')

        if (userData.cooldowns.daily > Date.now()) return interaction.reply({
            embeds: [
                embed.setDescription(`⌛ You have already collected your money, wait for **\`${prettyMilliseconds(userData.cooldowns.daily - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}\`**`)
            ],
            ephemeral: true
        })

        userData.wallet += 50
        userData.cooldowns.daily = new Date().setHours(24,0,0,0)
        userData.save()

        return interaction.reply({
            embeds: [ embed.setDescription(`💰 You have collected your daily \` 50 💎 \` amount`) ]
        })
        
    }
}