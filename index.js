const {
    Client,
    Intents,
    Permissions
} = require("discord.js")
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS]
});
const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);
const {
    prefix,
    token
} = require('./config.json')


client.on("messageCreate", async (message) => {
    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return
    if (!message.member.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return

    const msg = message.content.split(prefix)[1]

    if (msg == 'youtube') {
        if (message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
                return message.channel.send(`${invite.code}`);
            })
        } else {
            message.channel.send(`<@!${message.member.id}>, entre em um canal de voz.`)
        }
    }
})

client.login(token)