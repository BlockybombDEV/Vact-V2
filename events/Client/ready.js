const {Client} = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.user.setActivity(`/help | Serving ${client.guilds.cache.size} servers`, { type: ActivityType.Playing});
        console.log(`Bot is Online. Logged in as ${client.user.tag}`)
    }
}