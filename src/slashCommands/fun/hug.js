const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const axios = require('axios');
const { primaryColor } = require('../../config');

module.exports = {
	name: 'hug',
	description: "Geef iemand een knuffel",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: 'user',
            description: 'De gebruiker die je wilt knuffelen',
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
	run: async (client, interaction) => {
        const user = interaction.options.get('user')?.user;	
        if(isAuthor(user, interaction.user)) return interaction.reply({ content: 'Je kunt jezelf niet knuffelen.', ephemeral: true})
        const gif = await kissGif();

        const embed = new EmbedBuilder()
        .setDescription(`**${interaction.member} gaf ${user} een knuffel!**`)
        .setImage(gif)
        .setColor(primaryColor)

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
