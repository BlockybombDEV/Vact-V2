const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { User } = require("../../utils/schemas")
const prettyMilliseconds = require('pretty-ms');

const jobs = [
    "🧑‍🏫 Teacher",
    "🧑‍⚕️ Doctor",
    "👮 Police Officer",
    "🧑‍🍳 Chef",
    "🧑‍🚒 Firefighter",
    "🚌 Bus Driver",
    "🧑‍🔬 Scientist",
    "📮 Postman",
    "🧑‍🏭 Engineer",
    "🧑‍🎨 Artist",
    "🧑‍✈️ Pilot"
]


module.exports = {
    data: new SlashCommandBuilder()
        .setName("work")
        .setDescription("Work to earn money"),
    async execute(interaction) {
        const user = interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

        if (userData.cooldowns.work > Date.now())
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor("Yellow")
                        .setDescription(`⌛ You can work again in **\`${prettyMilliseconds(userData.cooldowns.work - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}\`**`)
                ],
                ephemeral: true
            })

        const amount = Math.floor(Math.random() * (100 - 10 + 1)) + 10
        const job = jobs[Math.floor(Math.random() * jobs.length)]

        userData.wallet += amount
        userData.cooldowns.work = Date.now() + (1000 * 60 * 60)
        userData.save()

        const workEmbed = new EmbedBuilder()
            .setDescription(`You worked as a **\` ${job} \`** and earned \` ${amount} 💎 \``)
            .setColor("Yellow")

        return interaction.reply({ embeds: [workEmbed] })

    }
}