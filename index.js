const Discord = require("discord.js")
const client = new Discord.Client(
	{ intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"] }
)

client.login(process.env.token)

client.on("ready", () => {
	console.log("Bot startato con successo!")
})

const fs = require("fs");

client.commands = new Discord.Collection();

const commandsFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandsFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("message", message => {
	const prefix = "!";
	if (!message.content.startsWhith(prefix) || message.author.bot) return

	const args = message.content.slice(prefix.length).trim().split(/ +/);

	const command = args.shift().toLowerCase();

	if(!client.commands.has(command)) return

	client.commands.get(command).execute(message);
})
