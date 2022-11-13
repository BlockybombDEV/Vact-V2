const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const EcoEmbed = new EmbedBuilder().setTitle('Economy commands').setColor('Green')
.setFields({name: 'Balance', value: '↳ Shows your current balance (Bank and wallet)', inline: true},
{name: 'Beg', value: '↳ Beg for money', inline: true},
{name: 'Daily', value: '↳ Get a daily bonus cash', inline: true},
{name: 'Deposit', value: '↳ Deposit cash from you wallet to bank', inline: true},
{name: 'Withdraw', value: '↳ Get money from your bank to wallet', inline: true},
{name: 'Fish', value: "↳ Fish for fish. It's that simple", inline: true},
{name: 'Give', value: '↳ Give someone money', inline: true},
{name: 'Work', value: '↳ Work for money', inline: true},
{name: 'Rob', value: '↳ Rob an user', inline: true}
)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('See a list of commands'),
    async execute(interaction) {
        await interaction.reply({ embeds: [EcoEmbed] });
    },
}