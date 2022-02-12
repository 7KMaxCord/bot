const Discord = require('discord.js');

module.exports = {
    name: "ticket",
    description: "ticket",
    execute(message, messageCreate) {
        if (message.content == "!comando") {
            var button1 = new Discord.MessageButton()
                .setLabel("Apri ticket")
                .setCustomId("apriTicket")
                .setStyle("PRIMARY")
    
            var row = new Discord.MessageActionRow()
                .addComponents(button1)
    
            message.channel.send({ content: "Clicca sul bottone per aprire un ticket", components: [row] })
        }
    }
}