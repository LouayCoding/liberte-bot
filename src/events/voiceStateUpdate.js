const { EmbedBuilder } = require("discord.js");
const client = require("..");
const { logChannelId } = require("../config");

client.on('voiceStateUpdate', (oldState, newState) => {
    const logChannel = client.channels.cache.get(logChannelId);

    if (newState.channel && !oldState.channel) {
        // Gebruiker is nieuw toegetreden tot een voicekanaal
        const embed = new EmbedBuilder()
            .setAuthor({ name: newState.member.user.tag, iconURL: newState.member.user.displayAvatarURL() })
            .setColor('#43B582')
            .setDescription(`${newState.member.user} **is toegetreden tot het voicekanaal** ${newState.channel}`)
            .setFooter({ text: `ID: ${newState.member.user.id}` })
            .setTimestamp()

        logChannel.send({ embeds: [embed] });
    } else if (!newState.channel && oldState.channel) {
        // Gebruiker heeft het voicekanaal verlaten
        const embed = new EmbedBuilder()
            .setAuthor({ name: newState.member.user.tag, iconURL: newState.member.user.displayAvatarURL() })
            .setColor('#FF470F')
            .setFooter({ text: `ID: ${newState.member.user.id}` })
            .setTimestamp()
            .setDescription(`**${newState.member.user} heeft het voicekanaal ${oldState.channel} verlaten**`);

        logChannel.send({ embeds: [embed] });
    } else if (newState.channel && oldState.channel && newState.channel !== oldState.channel) {
        // Gebruiker heeft van voicekanaal gewisseld
        const embed = new EmbedBuilder()
            .setAuthor({ name: newState.member.user.tag, iconURL: newState.member.user.displayAvatarURL() })
            .setColor('#43B582')
            .setFooter({ text: `ID: ${newState.member.user.id}` })
            .setTimestamp()
            .setDescription(`**${newState.member.user} is van het voicekanaal ${oldState.channel} naar ${newState.channel} gewisseld**`);

        logChannel.send({ embeds: [embed] });
    }
});