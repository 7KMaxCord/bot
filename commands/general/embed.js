const Discord = require('discord.js');

module.exports = {
    name: "embed",
    description: "Comando embed",
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Titolo") //Titolo
            .setColor("#34a42d") // Colore principale
            .setURL("UrlTitolo") //Link sul titolo
            .setAuthor("Autore") /*OPPURE*/.setAuthor("Autore", "LinkImmagine") //Autore
            .setDescription("Descrizione") //Descrizione
            .setThumbnail("UrlCopertina") //Copertina
            //Aggiungere elementi
            .addField("Titolo", "Contenuto", true) //QUI TUTTI I PARAMETRI SONO OBBLIGATORI - True o false = se questo elemento deve essere in linea con gli altri
            .setImage("LinkImmagine") //Immagine
            .setFooter("TestoFooter") /*OPPURE*/.setFooter("TestoFooter", "UrlImmagineFooter") // Testo piccolino in fondo
            .setTimestamp() //Se mettere o no l'orario di arrivo del messaggio
        message.channel.send({embeds: [embed]})
        
    }
}