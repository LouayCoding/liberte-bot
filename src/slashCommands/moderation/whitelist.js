const {
    ApplicationCommandType,
    EmbedBuilder,
    ApplicationCommandOptionType
} = require('discord.js');
const { primaryColor, footer, succesColor, whitelistRoleId } = require('../../config');

module.exports = {
    name: 'whitelist',
    description: "Beheer gebruikersrollen",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'picperms',
            description: 'Voeg een rol toe aan een gebruiker',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'gebruiker',
                    description: 'De gebruiker aan wie je de rol wilt toevoegen',
                    type: ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        },
    ],
    run: async (client, interaction) => {
        const subcommand = interaction.options.getSubcommand();

        const member = interaction.options.getMember('gebruiker');

       

        if (subcommand === 'picperms') {
            if(member.roles.cache.has(whitelistRoleId)) return interaction.reply({ content: `${member} is al whitelisted.`, ephemeral: true})
            member.roles.add(whitelistRoleId);
            const embed = new EmbedBuilder().setColor(succesColor).setDescription(`${member} is nu whitelisted.`);
            interaction.reply({ embeds: [embed]})

        } 
    }

};
