const Discord = require('discord.js');

module.exports = {
    name: "embed",
    description: "Comando embed",
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Ciao")
        message.channel.send({embeds: [embed]})
        
    }
}