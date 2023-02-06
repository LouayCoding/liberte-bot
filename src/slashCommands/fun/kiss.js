const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const axios = require('axios');

module.exports = {
	name: 'kiss',
	description: "Give someone a kiss",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: 'user',
            description: 'The user you want to kiss.',
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
	run: async (client, interaction) => {
        const user = interaction.options.get('user')?.user;	
        if(isAuthor(user, interaction.user)) return interaction.reply({ content: 'You can\'t kiss yourself', ephemeral: true})
        const gif = await kissGif();

        const embed = new EmbedBuilder()
        .setDescription(`**${interaction.member} gave ${user} a kiss!**`)
        .setImage(gif)
        .setColor(client.config.primaryColor)

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
