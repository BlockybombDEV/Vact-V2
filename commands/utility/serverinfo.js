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
		.setDescription(`Created on <t:${Math.floor(interaction.guild.createdTimestamp/1000)}:f>`)
		.setTitle(`${interaction.guild.name}`)
	   	.setColor('Blurple')
		.addFields(
			{name: 'Owner', value: `<@${interaction.guild.ownerId}>`, inline: true},
			{name: 'Roles', value: `${roleStr}`, inline: true},
			{name: 'Members', value: `${interaction.guild.memberCount}`, inline: true}
		)
		.setThumbnail(interaction.guild.iconURL())
		.setFooter({ text: `ID: ${interaction.guildId} | Created on <t:${Math.floor(interaction.guild.createdTimestamp/1000)}:d> <t:${Math.floor(interaction.guild.createdTimestamp/1000)}:t>`})
		return interaction.reply({ embeds: [embed] });
	},
};