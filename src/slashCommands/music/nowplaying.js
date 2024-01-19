const { ApplicationCommandType } = require('discord.js');
const { Spotify } = require("canvafy");

module.exports = {
    name: 'nowplaying',
    description: "Toon het momenteel afgespeelde nummer",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: 'Er word nu niks afgespeeld.', ephemeral: true });
        const song = queue.songs[0];

        const currentTime = queue.currentTime;

        const spotify = await new Spotify()
        .setAuthor(song.uploader.name)
        .setTimestamp(currentTime * 1000, song.duration * 1000)
        .setImage(song.thumbnail)
        .setTitle(song.name)
        .setBlur(5)
        .setOverlayOpacity(0.7)
        .build();
    
        interaction.reply({
          files: [{
            attachment: spotify,
            name: `spotify.png`
          }]
        });

    }
};

