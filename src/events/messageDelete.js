const { EmbedBuilder } = require("discord.js");
const { footer, berichtenLogChannelId } = require('../config');
const client = require("..");
client.lastSnipe = null;


client.on('messageDelete', (message) => {
    // Controleer of message een geldige waarde heeft
    if (!message || !message.author || !message.channel) {
        return; // Voorkom dat de code verder wordt uitgevoerd als message ongeldig is
    }

    client.lastSnipe = {
        content: message.content,
        author: message.author,
        date: new Date()
    };

    const logChannel = message.guild.channels.cache.get(berichtenLogChannelId);
    if (!logChannel) return;

    // Bericht had tekstinhoud
    if (message.content) {
        const textEmbed = new EmbedBuilder()
            .setDescription(`**Bericht verzonden door ${message.author} en verwijderd in ${message.channel}**\n${message.content}`)
            .setTimestamp()
            .setColor('#FF470F')
            .setFooter({ text: footer });

        logChannel.send({ embeds: [textEmbed] });
    }

    // Bericht had een afbeelding
    if (message.attachments.size > 0) {
        const attachmentUrls = Array.from(message.attachments.values()).map(attachment => attachment.url);

        const imageEmbed = new EmbedBuilder()
            .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setColor('#FF470F')
            .setDescription(`**Afbeelding verzonden door ${message.author} verwijderd in ${message.channel.name}**`)
            .setTimestamp()
            .setFooter({ text: footer });

        // Voeg de eerste afbeelding toe aan de embed
        if (attachmentUrls.length > 0) {
            imageEmbed.setImage(attachmentUrls[0]);
        }

        logChannel.send({ embeds: [imageEmbed] });
    }
});
