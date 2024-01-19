const { ApplicationCommandType, EmbedBuilder, AttachmentBuilder, ApplicationCommandOptionType } = require('discord.js');
const { primaryColor } = require('../../config');
const { Music } = require('../../utils/music');


module.exports = {
    name: 'skip',
    description: "Sla het huidige nummer over of kies hoeveel nummers je wilt overslaan",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'aantal',
            description: 'Het aantal nummers om over te slaan',
            type: ApplicationCommandOptionType.Integer,
            required: false
        }
    ],
    run: async (client, interaction) => {
       new Music(interaction).skip();
    }
};

