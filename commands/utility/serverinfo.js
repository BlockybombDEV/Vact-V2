const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Display info about this server.'),
	async execute(interaction) {
        const embed = new EmbedBuilder().setDescription(`**Total members**: ${interaction.guild.memberCount}
       `).setTitle(`${interaction.guild.name}`).setColor('Blurple')
		return interaction.reply({ embeds: [embed] });
	},
};