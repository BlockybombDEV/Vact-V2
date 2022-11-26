const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Display info about this server.'),
	async execute(interaction) {
		var roleStr = "";

		interaction.guild.roles.cache.forEach((role) => {
			if (!role.name.includes('@everyone')) roleStr += `<@&${role.id}> `
		})

        const embed = new EmbedBuilder()
		.setTitle(`${interaction.guild.name}`)
	   	.setColor('Blurple')
		.addFields(
			{name: 'Owner', value: `<@${interaction.guild.ownerId}>`, inline: true},
			{name: 'Members', value: `${interaction.guild.memberCount}`, inline: true},
			{name: 'Roles', value: `${roleStr}`}
		)
		.setThumbnail(interaction.guild.iconURL())
		.setFooter({ text: `ID: ${interaction.guildId} | Created on ${interaction.guild.createdAt.toLocaleDateString()} ${interaction.guild.createdAt.toLocaleTimeString()}`})
		return interaction.reply({ embeds: [embed] });
	},
};