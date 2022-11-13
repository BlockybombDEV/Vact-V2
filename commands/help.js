const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

// Help Embeds
const EcoEmbed = new EmbedBuilder().setTitle('Economy commands').setColor('Green')
.setFields({name: 'Balance', value: '↳ Shows your current balance (Bank and wallet)', inline: true},
{name: 'Beg', value: '↳ Beg for money', inline: true},
{name: 'Daily', value: '↳ Get a daily bonus cash', inline: true},
{name: 'Deposit', value: '↳ Deposit cash from you wallet to bank', inline: true},
{name: 'Withdraw', value: '↳ Get money from your bank to wallet', inline: true},
{name: 'Fish', value: "↳ Fish for fish. It's that simple", inline: true},
{name: 'Give', value: '↳ Give someone money', inline: true},
{name: 'Work', value: '↳ Work for money', inline: true},
{name: 'Rob', value: '↳ Rob an user', inline: true},
)

const ModEmbed = new EmbedBuilder().setTitle('Moderation commands').setColor('Blue')
.setFields(
    {name: 'Ban', value: '↳ Bans an user', inline: true},
    {name: 'Kick', value: '↳ Kicks an user', inline: true},
    {name: 'Prune', value: '↳ Deletes up to 99 messages', inline: true},
)

const UtilEmbed = new EmbedBuilder().setTitle('Utility commands').setColor('Gold')
.setFields(
    {name: 'Avatar', value: '↳ Shows an users avatar', inline: true},
    {name: 'Help', value: '↳ Shows this', inline: true},
    {name: 'Members', value: '↳ Shows the amount of members in the server', inline: true},
    {name: 'Support', value: '↳ Sends an invite for the support server', inline: true }
)






// Slash command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('See a list of commands'),
    async execute(interaction) {
        await interaction.reply({ embeds: [EcoEmbed, ModEmbed, UtilEmbed] });
    },
}


