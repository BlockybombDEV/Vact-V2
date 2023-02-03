const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const { User } = require("../../utils/schemas")

// item list
// stick
// parfume
// cheese (development item)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('Browse through the shop'),
    async execute(interaction) {
        const shopEmbed = new EmbedBuilder()
            .setTitle('🛒 shop')
            .addFields(
                {name: "stick", value: "1 💎"},
                {name: "perfume", value: "5 💎",},
                {name: "cheese", value: "60 💎"}
            )

        
            
        await interaction.reply({embeds: [shopEmbed]})
    }    
}