const Discord = require('discord.js');
const client = new Discord.Client(
    { intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"] }
)

module.exports = {
    name: "test",
    description: "Comando di test",
    execute(message, interaction) {
        client.on("messageCreate", message => {
            if (message.content == "!comando") {
                var button1 = new Discord.MessageButton()
                    .setLabel("Apri ticket")
                    .setCustomId("apriTicket")
                    .setStyle("PRIMARY")
        
                var row = new Discord.MessageActionRow()
                    .addComponents(button1)
        
                message.channel.send({ content: "Clicca sul bottone per aprire un ticket", components: [row] })
            }
        })
        
        client.on("interactionCreate", interaction => {
            if (interaction.customId == "apriTicket") {
                interaction.deferUpdate()
                if (interaction.guild.channels.cache.find(canale => canale.topic == `User ID: ${interaction.user.id}`)) {
                    interaction.user.send("Hai gia un ticket aperto").catch(() => { })
                    return
                }
                interaction.guild.channels.create(interaction.user.username, {
                    type: "text",
                    topic: `User ID: ${interaction.user.id}`,
                    parent: "idCategoria", //Settare la categoria,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: interaction.user.id,
                            allow: ["VIEW_CHANNEL"]
                        },
                        { //Aggiungere altri "blocchi" se si vogliono dare permessi anche a ruoli o utenti
                            id: "idRuolo",
                            allow: ["VIEW_CHANNEL"]
                        }
                    ]
                }).then(canale => {
                    canale.send("Grazie per aver aperto un ticket")
                })
            }
        })
        
        client.on("messageCreate", message => {
            if (message.content == "!close") {
                var topic = message.channel.topic;
                if (!topic) {
                    message.channel.send("Non puoi utilizzare questo comando qui");
                    return
                }
                if (topic.startsWith("User ID:")) {
                    var idUtente = topic.slice(9);
                    if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                        message.channel.delete();
                    }
                }
                else {
                    message.channel.send("Non puoi utilizzare questo comando qui")
                }
            }
            if (message.content.startsWith("!add")) {
                var topic = message.channel.topic;
                if (!topic) {
                    message.channel.send("Non puoi utilizzare questo comando qui");
                    return
                }
                if (topic.startsWith("User ID:")) {
                    var idUtente = topic.slice(9);
                    if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                        var utente = message.mentions.members.first();
                        if (!utente) {
                            message.channel.send("Inserire un utente valido");
                            return
                        }
                        var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)
                        if (haIlPermesso) {
                            message.channel.send("Questo utente ha gia accesso al ticket")
                            return
                        }
                        message.channel.permissionOverwrites.edit(utente, {
                            VIEW_CHANNEL: true
                        })
                        message.channel.send(`${utente.toString()} ?? stato aggiunto al ticket`)
                    }
                }
                else {
                    message.channel.send("Non puoi utilizzare questo comando qui")
                }
            }
            if (message.content.startsWith("!remove")) {
                var topic = message.channel.topic;
                if (!topic) {
                    message.channel.send("Non puoi utilizzare questo comando qui");
                    return
                }
                if (topic.startsWith("User ID:")) {
                    var idUtente = topic.slice(9);
                    if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                        var utente = message.mentions.members.first();
                        if (!utente) {
                            message.channel.send("Inserire un utente valido");
                            return
                        }
                        var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)
                        if (!haIlPermesso) {
                            message.channel.send("Questo utente non ha gia accesso al ticket")
                            return
                        }
                        if (utente.permissions.has("MANAGE_CHANNELS")) {
                            message.channel.send("Non puoi rimuovere questo utente")
                            return
                        }
                        message.channel.permissionOverwrites.edit(utente, {
                            VIEW_CHANNEL: false
                        })
                        message.channel.send(`${utente.toString()} ?? stato rimosso al ticket`)
                    }
                }
                else {
                    message.channel.send("Non puoi utilizzare questo comando qui")
                }
            }
        })
    }
}