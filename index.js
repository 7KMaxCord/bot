const Discord = require("discord.js")
const client = new Discord.Client(
	{ intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"] }
)

client.login("OTM4Nzg2NTYzODAwODM0MDU4.YfvXHg.f1jgL6Qs4nKn6WrMH5cDsKTxr-o")

client.on("ready", () => {
	console.log("Bot startato con successo!")
})