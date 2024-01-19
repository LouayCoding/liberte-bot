const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { primaryColor } = require('../../config');

module.exports = {
    name: 'setname',
    description: 'Verander de nickname van een gebruiker of reset naar de standaardnaam.',
    options: [
        {
            name: 'gebruiker',
            description: 'De gebruiker waarvan je de naam wilt aanpassen.',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'naam',
            description: 'De nieuwe naam voor de gebruiker. Laat leeg om de naam te resetten.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const targetUser = interaction.options.getMember('gebruiker');
        const newNickname = interaction.options.getString('naam');


        try {
             if (newNickname) {
                // Verander de nickname van de gebruiker
                await targetUser.setNickname(newNickname);
                const embed = new EmbedBuilder().setDescription(`De naam van ${targetUser} is veranderd naar ${newNickname}.`).setColor(primaryColor)
                await interaction.reply({ embeds: [embed] });
            } else {
                await interaction.reply({ content: 'Geef een nieuwe naam op of gebruik de resetoptie om naar de standaardnaam te resetten.', ephemeral: true });
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Er is een fout opgetreden bij het aanpassen van de naam.', ephemeral: true });
        }
    },
};
