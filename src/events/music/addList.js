const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

function addList(client) {
    client.distube.on('addList', (queue, playlist) => {
        const interaction = song.metadata.i;

        // const embed = new EmbedBuilder()
        //     .setTitle(playlist.name)
            // .setURL(playlist.url)
            // .setAuthor({ name: 'Toegevoegd aan wachtrij', iconURL: 'https://im3.ezgif.com/tmp/ezgif-3-00f7be0751.gif' })
            // .addFields(
            //     { name: 'Naam', value: playlist.name, inline: true },
            //     { name: 'Duur', value: playlist.formattedDuration, inline: true },
            //     { name: 'Aanvrager', value: `${playlist.user.tag}`, inline: true }
            // )
            // .setThumbnail(playlist.thumbnail)

       
        interaction.editReply({ embeds: [embed] });


    });
};

module.exports = addList;


