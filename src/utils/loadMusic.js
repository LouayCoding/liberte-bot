const { EmbedBuilder, ComponentType, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const Genius = require("genius-lyrics");
const playEvent = require("../events/music/playSong");
const addSong = require("../events/music/addSong");
const finishSong = require('../events/music/finishSong');
const addList = require('../events/music/addList');



class Music {

    constructor(client) {
        this.client = client;
    }

    // all events inladen

    async loadMusic() {
        playEvent(this.client);
        addSong(this.client)
        finishSong(this.client)
        // addList(this.client)
        this.client.lyrics = new Genius.Client("33EPKdfIuQkNTfaujuLI5AmtgP2bBo3zCYUIPF1woT_Sjm8ptEQrFKI4loxwTzlW");
        console.log('Muziek module is ingeladen.');
    }

    async buttonCollector(message, oldInteraction) {
        const queue = await this.client.distube.getQueue(message.guild.id);
        if (!queue) return;

        const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 1500000 });

        collector.on('collect', async (interaction) => {
            if (await this.isAllowed(interaction)) {
                switch (interaction.customId) {
                    case 'pauseplay':
                        await this.pausePlayClick(interaction);
                        break;
                    case 'previous':
                        await this.previousClick(interaction);
                        break;
                    case 'skip':
                        await this.skipClick(interaction);
                        break;
                    case 'lyrics':
                        await this.lyricsClick(interaction, queue.songs[0].name);
                        break;
                    case 'loop':
                        this.getCurrentSong(interaction.guild)
                        await this.loopClick(interaction, queue.songs[0].name);
                        break;
                    case 'forward':
                        await this.forwardClick(interaction);
                        break;
                    case 'backward':
                        await this.backwardClick(interaction);
                        break;
                    case 'shuffle':
                        await this.shuffleClick(interaction);
                        break;
                }
            }
        });


        collector.on('end', collected => console.log(`Collected ${collected.size} items`));

    }

    async isAllowed(interaction) {
        if (!interaction.member.voice.channel) {
            await interaction.reply({ content: 'Je moet in een spraakkanaal zitten om dit commando te kunnen uitvoeren.', ephemeral: true });
            return null;
        }
        this.queue = this.client.distube.getQueue(interaction.guild.id);
        if (interaction.guild.members.me.voice.channel?.id && this.queue?.playing) {
            if (interaction.guild.members.me.voice.channel.id !== interaction.member.voice.channel.id) {
                await interaction.reply({ content: 'Je moet in hetzelfde kanaal als mij zitten om dit commando te kunnen uitvoeren.', ephemeral: true });
                return null;
            }
        }
        return true;
    }

    async isLoading(interaction, query) {
        const emoji = this.client.emojis.cache.get('1069017682747330591');
        this.embed = new EmbedBuilder()
            .setDescription(`${emoji} Aan het zoeken naar... **${query}**`)
        this.response = await interaction.reply({ embeds: [this.embed] });
        return this.response.interaction;
    }
    
    async resume(interaction) {
        this.queue = this.client.distube.getQueue(interaction.guild.id);
        if (!this.queue) {
            await interaction.reply({ content: 'Er zit momenteel niks in de queue.', ephemeral: true });
            return false;
        }
        if (!this.queue.paused) {
            return interaction.reply({ content: 'Queue word al afgespeeld.', ephemeral: true });
            return false;
        }
        this.queue.resume();
        return interaction.reply({ content: 'Queue is hervat.', ephemeral: true });
    }

    async pause(interaction) {
        this.queue = this.client.distube.getQueue(interaction.guild.id);
        if (!this.queue) {
            await interaction.reply({ content: 'Er zit momenteel niks in de queue.', ephemeral: true });
            return false;
        }
        if (this.queue.paused) {
            return interaction.reply({ content: 'Dit nummer is al gepauzeerd.', ephemeral: true });
            return false;
        }
        this.queue.pause();
        return interaction.reply({ content: 'Nummer is gepauzeerd.', ephemeral: true });
    }

    async stop(interaction) {
        this.queue = this.client.distube.getQueue(interaction.guild.id);
        this.queue.stop();
        return interaction.reply({ content: 'Queue is gestopt.', ephemeral: true });
    }

    async skip(interaction) {
        const queue = this.client.distube.getQueue(interaction.guild.id);
        try {
            await queue.skip();
            await interaction.reply({ content: 'Huidige nummer is geskipt.', ephemeral: true });
            return true;
        } catch (error) {
            interaction.reply({ content: 'Er zit geen nummer in de wachtrij.', ephemeral: true })
        }

    }

        async previous(interaction) {
        const queue = this.client.distube.getQueue(interaction.guild.id);
        try {
            await queue.previous();
            await interaction.reply({ content: 'Succes', ephemeral: true });
            return true;
        } catch (error) {
            interaction.reply({ content: 'Er zit geen nummer in de wachtrij.', ephemeral: true })
        }

    }

    async loop(interaction) {
        const queue = this.client.distube.getQueue(interaction.guild.id);
        try {
            const loop = await queue.setRepeatMode();

            if (loop === 0) return await interaction.reply({ content: 'Loop is uitgeshakeld.', ephemeral: true });
            else if (loop === 1) return await interaction.reply({ content: 'Huidige nummer word nu geloopt.', ephemeral: true });
            else if (loop === 2) return await interaction.reply({ content: 'De queue word nu geloopt.', ephemeral: true });

        } catch (error) {
            interaction.reply({ content: 'Er zit geen nummer in de wachtrij.', ephemeral: true })
        }

    }

    async shuffle(interaction) {
        const queue = this.client.distube.getQueue(interaction.guild.id);
        try {
            const loop = await queue.shuffle();
            return loop;

        } catch (error) {
            interaction.reply({ content: 'Er zit geen nummer in de wachtrij.', ephemeral: true })
        }

    }


    async pausePlayClick(interaction) {
        const queue = this.client.distube.getQueue(interaction.guild.id);
        if (queue.paused) await this.resume(interaction);
        else await this.pause(interaction);
    }


    async stopClick(interaction) {
        await this.stop(interaction);
        await interaction.message.delete();
    }

    async skipClick(interaction) {
        const skip = await this.skip(interaction);
        if (skip) await interaction.message.delete();

    }

    async previousClick(interaction) {
        const previous = await this.previous(interaction);
        if (previous) await interaction.message.delete();

    }

    async loopClick(interaction) {
        await this.loop(interaction);

    }

    async forwardClick(interaction) {
        const song = await this.getCurrentSong(interaction.guild);
        const queue = this.client.distube.getQueue(interaction.guild.id);
        const currentTime = queue.currentTime;
        const duration = song.duration;
        if (currentTime + 10 >= duration) {
            await queue.seek(duration);
            return interaction.reply({ content: 'Succesvol doorgespoelt.', ephemeral: true });
        }
        await queue.seek(currentTime + 10);
        return interaction.reply({ content: 'Succesvol doorgespoelt.', ephemeral: true });
    }

    async backwardClick(interaction) {
        const song = await this.getCurrentSong(interaction.guild);
        const queue = this.client.distube.getQueue(interaction.guild.id);
        const currentTime = queue.currentTime;
        const duration = song.duration;
        if (currentTime - 10 < 0) {
            await queue.seek(0);
            return interaction.reply({ content: 'Succesvol teruggespoelt.', ephemeral: true });
        }
        await queue.seek(currentTime - 10);
        return interaction.reply({ content: 'Succesvol teruggespoelt.', ephemeral: true });
    }

    async shuffleClick(interaction) {
        await this.shuffle(interaction);
        return interaction.reply({ content: 'Succesvol geshufflet.', ephemeral: true });
    }

    async lyricsClick(interaction, title) {
        const searches = await this.client.lyrics.songs.search(title);
        const firstSong = searches[0];
        const lyrics = await firstSong.lyrics();

        const text = lyrics;
        let startIndex = 0;
        let endIndex = text.indexOf("\n\n");
        const extractedText = [];
        let tempArr = []

        while (endIndex !== -1) {
            const str = text.slice(startIndex, endIndex);
            if (tempArr.join('').length + str.length > 2000) {
                extractedText.push(tempArr);
                tempArr = [];
            }
            tempArr.push(str);
            startIndex = endIndex + 2;
            endIndex = text.indexOf("\n\n", startIndex);
        }

        tempArr.push(text.slice(startIndex));
        extractedText.push(tempArr);

        const extractedTextStrings = extractedText.map(subArr => subArr.join("\n\n"));

        const embed = new EmbedBuilder()
            .setAuthor({ name: title })
            .setDescription(extractedTextStrings[0])


        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('previous')
                    .setLabel('Previous')
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('s')
                    .setLabel(`1/${extractedTextStrings.length}`)
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('next')
                    .setLabel('Next')
                    .setDisabled(false)
                    .setStyle(ButtonStyle.Secondary),
            );

        const message = await interaction.channel.send({ embeds: [embed], components: [row] });

        const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 1500000 });

        collector.on('collect', async (interaction) => {
            if (await this.isAllowed(interaction)) {
                if (interaction.customId === 'pause') await this.pauseClick(interaction);
                else if (interaction.customId === 'resume') await this.resumeClick(interaction);
                else if (interaction.customId === 'stop') await this.stopClick(interaction);
                else if (interaction.customId === 'skip') await this.skipClick(interaction);
                else if (interaction.customId === 'lyrics') await this.lyrics(interaction, queue.songs[0].name);
            }
        });
    }

    //
    //
    //

    getCurrentSong(guild) {
        const queue = this.client.distube.getQueue(guild);
        return queue.songs[0];
    }
}

module.exports = Music;