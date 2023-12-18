const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const axios = require('axios');

module.exports = {
	name: 'kiss',
	description: "Geef iemand een kus",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: 'user',
            description: 'De gebruiker die je wilt kussen',
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
	run: async (client, interaction) => {
        const user = interaction.options.get('user')?.user;	
        if(isAuthor(user, interaction.user)) return interaction.reply({ content: 'Je kunt jezelf niet kussen.', ephemeral: true})
        const gif = await kissGif();

        const embed = new EmbedBuilder()
        .setDescription(`**${interaction.member} gaf ${user} een kus!**`)
        .setImage(gif)
        .setColor('5865F2')

        await interaction.reply({ embeds: [embed]});

        
        
        async function kissGif(){
            const response = await axios.get('https://api.otakugifs.xyz/gif?reaction=hug');
            return response.data.url;
        }

        function isAuthor(mentionedUser, author){
            if(mentionedUser === author) return true;
            else return false;
        }
    }
};
