const Discord = require('discord.js');

module.exports = {
    name: "ticket",
    description: "ticket",
    execute(message, args) {
        var button1 = new Discord.MessageButton()
            .setLabel("Apri ticket")
            .setCustomId("apriTicket")
            .setStyle("PRIMARY")

        var row = new Discord.MessageActionRow()
            .addComponents(button1)

        message.channel.send({ content: "Clicca sul bottone per aprire un ticket", components: [row] })
    }
    
}

module.exports = {
    name: "transcript",
    description: "transcript",
    execute(message, args) {
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
    }
}