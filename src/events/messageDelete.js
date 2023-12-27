const client = require('..');
const { EmbedBuilder } = require("discord.js");
const { berichtenLogChannelId } = require('../config');

client.on('messageDelete', (deletedMessage) => {
    // Controleer of deletedMessage een geldige waarde heeft
    if (!deletedMessage || !deletedMessage.author || !deletedMessage.channel || !deletedMessage.content) {
        return; // Voorkom dat de code verder wordt uitgevoerd als deletedMessage ongeldig is
    }

    // Maak een embed om het verwijderde bericht te tonen
    const embed = new EmbedBuilder()
        .setDescription(`**Bericht verzonden door ${deletedMessage.author} en verwijderd in ${deletedMessage.channel}**\n${deletedMessage.content}`)
        .setTimestamp()
        .setFooter({ text: 'Liberté'})

    // Hier kun je aangeven naar welk kanaal de embed moet worden gestuurd
    const logChannel = deletedMessage.guild.channels.cache.get(berichtenLogChannelId);
    if (logChannel) {
        logChannel.send({ embeds: [embed] });
    }
});
