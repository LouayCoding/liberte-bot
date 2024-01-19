const { EmbedBuilder } = require("discord.js");
const { primaryColor } = require("../config");
const client = require("..");

class Music {
    constructor(interaction) {
        this.client = client;
        this.interaction = interaction;
    }

    skip() {
        
        const { client, interaction } = this;
        const queue = client.distube.getQueue(interaction.guild);
        console.log(queue.songs.metadata)

        if (!queue) {
            return interaction.reply({ content: 'Op dit moment staat er niets in de wachtrij!', ephemeral: true });
        }

        const skipCount = interaction.options.getInteger('aantal') || 1;

        if (skipCount === 1) {
            queue.skip(skipCount);
            const embed = new EmbedBuilder().setDescription(`Ik heb **1 nummer** overgeslagen.`).setColor(primaryColor);
            return interaction.reply({ embeds: [embed] });
        }

        if (skipCount <= queue.songs.length && skipCount > 1) {
            queue.jump(skipCount);
            const embed = new EmbedBuilder().setDescription(`Ik heb **${skipCount} nummers** overgeslagen.`).setColor(primaryColor);
            return interaction.reply({ embeds: [embed] });
        }

        return interaction.reply({ content: `Maximaal aantal nummers dat je kunt overslaan is **${queue.songs.length}.**`, ephemeral: true });
    }
}





module.exports = {Music};
