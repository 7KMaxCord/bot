const Discord = require('discord.js');

module.exports = {
    name: "embed",
    description: "Comando embed",
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Titolo") //Titolo
            .setColor("#34a42d") // Colore principale
            .setAuthor("Autore")
            .setDescription("Descrizione") //Descrizione
            //Aggiungere elementi
            .addField("Titolo", "Contenuto", true) //QUI TUTTI I PARAMETRI SONO OBBLIGATORI - True o false = se questo elemento deve essere in linea con gli altri
            .setImage("https://cdn.discordapp.com/attachments/857322373686886420/860472233792765982/realm.gif") //Immagine  
        message.channel.send({embeds: [embed]})
        
    }
}