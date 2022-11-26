const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Display info about a specified user.')
		.addUserOption(option => option.setName('target').setDescription('The user specified.').setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		const member = interaction.guild.members.cache.get(user.id);
		var roleStr = "";

		member.roles.cache.forEach((role) => {
			if (!role.name.includes('@everyone')) roleStr += `<@&${role.id}> `
		})

		if (roleStr.length < 1) roleStr = "N/A";

        const embed = new EmbedBuilder().setTitle(`\`${user.tag}\``).setColor('#9048e2')
		.setDescription(`→ ID: \`${user.id}\` \n→ Joined on <t:${Math.floor(member.joinedTimestamp/1000)}:f>`).addFields(
		{name: 'Roles', value: `${roleStr}`, inline: true},
		{name: `Nickname`, value: `${member.nickname ?? 'N/A'}`, inline: true},
	   )
	   .setThumbnail(user.avatarURL())
		return interaction.reply({ embeds: [embed] });
	},
};