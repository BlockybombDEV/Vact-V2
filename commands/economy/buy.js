const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const { User } = require("../../utils/schemas")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buy')
        .setDescription('Buy an item from the shop')
        .addStringOption(option => option
            .setName('item')
            .setDescription('Item you want buy')
            .setRequired(true)
            .addChoices(
                { name: 'stick', value: 'item_stick'},
                { name: 'perfume', value: 'item_perfume'},
                { name: 'cheese', value: 'item_cheese'}
            )
        ),
    async execute(interaction) {
        const category = interaction.options.getString('item')
        const user = interaction.member.user

        if (category === 'item_stick') {
            userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
            embed = new EmbedBuilder().setColor('Yellow')

            if (userData.bank < 1) return interaction.reply({
                embeds: [ embed.setDescription(`💰 You need \` ${1 - userData.bank} 💎 \` more in your bank to buy this item!`) ],
                ephemeral: true
            })

            userData.bank -= 1
            userData.inventory += '🏑 stick '
            userData.save()

            return interaction.reply({
                embeds: [ embed.setDescription(`✅ You have bought a stick \n Remaining balance: \` ${userData.bank} 💎 \` `) ]
            })
        } else if (category === 'item_perfume') {
            userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
            embed = new EmbedBuilder().setColor('Yellow')

            if (userData.bank < 5) return interaction.reply({
                embeds: [ embed.setDescription(`💰 You need \` ${5 - userData.bank} 💎 \` more in your bank to buy this item!`) ],
                ephemeral: true
            })
            
            userData.bank -= 5
            userData.inventory += '🧪 perfume '
            userData.save()

            return interaction.reply({
                embeds: [ embed.setDescription(`✅ You have bought some parfume \n Remaining balance: \` ${userData.bank} 💎 \` `) ]
            })
        } else if (category === 'item_cheese') {
            userData = await User.findOne({ id: user.id }) || new User({ id: user.id }),
            embed = new EmbedBuilder().setColor('Yellow')

            if (userData.bank < 60) return interaction.reply({
                embeds: [ embed.setDescription(`💰 You need \` ${60 - userData.bank} 💎 \` more in your bank to buy this item!`) ],
                ephemeral: true
            })
            
            userData.bank -= 60
            userData.inventory += '🧀 cheese '
            userData.save()

            return interaction.reply({
                embeds: [ embed.setDescription(`✅ You have bought a piece of cheese \n Remaining balance: \` ${userData.bank} 💎 \` `) ]
            })
        }
    }
}