const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const axios = require('axios');
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
	name: 'slap',
	description: "Geef iemand een klap",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: 'gebruiker',
            description: 'De gebruiker die je wilt slaan.',
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
	run: async (client, interaction) => {
           
        const user = interaction.options.get('gebruiker')?.user;	
        if(isAuthor(user, interaction.user)) return interaction.reply({ content: 'Je kunt jezelf niet slaan.', ephemeral: true})
        const gif = await kissGif();

        const embed = new EmbedBuilder()
        .setDescription(`**${interaction.member} gaf ${user} een klap!**`)
        .setImage(gif)
        .setColor('5865F2')

        await interaction.reply({ embeds: [embed]});

        
        
        async function kissGif(){
            const response = await axios.get('https://api.otakugifs.xyz/gif?reaction=slap');
            return response.data.url;
        }

        function isAuthor(mentionedUser, author){
            if(mentionedUser === author) return true;
            else return false;
        }
    }
};
