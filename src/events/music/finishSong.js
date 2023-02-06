const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType } = require("discord.js");

function finishSong(client) {
    client.distube.on('finishSong', (queue, song) => {
       const interaction = song.metadata.i;
       interaction.edit({ components: [] });
    });
};

module.exports = finishSong;


