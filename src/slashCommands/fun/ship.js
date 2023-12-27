const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const canvafy = require('canvafy'); // Voeg canvafy toe als dit nog niet is geïnstalleerd

module.exports = {
    name: 'ship',
    description: 'Koppel twee gebruikers en ontdek hun compatibiliteit!',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'gebruiker1',
            description: 'Kies de eerste gebruiker om te koppelen.',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'gebruiker2',
            description: 'Kies de tweede gebruiker om te koppelen.',
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],    
    run: async (client, interaction) => {
        const gebruiker1 = interaction.options.getUser('gebruiker1');
        const gebruiker2 = interaction.options.getUser('gebruiker2');

        if (gebruiker1.id === gebruiker2.id) {
            return interaction.reply({ content: "Je kunt niet dezelfde gebruiker koppelen!", ephemeral: true });
        }


        console.log()
        // Hier kun je de logica toevoegen om de gebruikers te shippen
        const ship = await new canvafy.Ship()
        .setAvatars(gebruiker1.displayAvatarURL({ forceStatic: true, extension: "png" }),gebruiker2.displayAvatarURL({ forceStatic: true, extension: "png" }))
            .setBackground("image", "https://i.imgur.com/V4zUUQL.png")
            .setBorder("#f0f0f0")
            .setOverlayOpacity(0.5)
            .build();

        interaction.reply({
            files: [{
                attachment: ship,
                name: `ship-${gebruiker1.id}-${gebruiker2.id}.png`
            }]
        });
    }
};
