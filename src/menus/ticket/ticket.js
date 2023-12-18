const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    id: 'ticket',
    permissions: [],
    run: async (client, interaction) => {
        const value = interaction.values[0];

        switch (value) {
            case 'solliciteren':
                const applicationModal = new ModalBuilder()
                    .setCustomId('applicationModal')
                    .setTitle('Sollicitatie Formulier');

                const nameInput = new TextInputBuilder()
                    .setCustomId('nameInput')
                    .setLabel('Wat is je naam?')
                    .setStyle(TextInputStyle.Short);

                const ageInput = new TextInputBuilder()
                    .setCustomId('ageInput')
                    .setLabel('Hoe oud ben je?')
                    .setStyle(TextInputStyle.Short);

                const experienceInput = new TextInputBuilder()
                    .setCustomId('experienceInput')
                    .setLabel('Heb je ervaring? Zo ja, vertel daarover.')
                    .setStyle(TextInputStyle.Paragraph);

                const firstRow = new ActionRowBuilder().addComponents(nameInput);
                const secondRow = new ActionRowBuilder().addComponents(ageInput);
                const thirdRow = new ActionRowBuilder().addComponents(experienceInput);

                applicationModal.addComponents(firstRow, secondRow, thirdRow);

                await interaction.showModal(applicationModal)
                break;

            default:
                break;
        }


    },
}
