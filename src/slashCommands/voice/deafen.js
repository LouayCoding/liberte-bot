const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { primaryColor } = require('../../config');

module.exports = {
    name: 'voice',
    description: 'Beheer spraakkanaalinstellingen.',
    options: [
        {
            name: 'deafen',
            description: 'Schakel het horen van audio uit voor een gebruiker.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'gebruiker',
                    description: 'De gebruiker waarvan je het gehoor wilt uitschakelen.',
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
            ],
        },
        {
            name: 'undeafen',
            description: 'Schakel het horen van audio in voor een gebruiker.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'gebruiker',
                    description: 'De gebruiker waarvan je het gehoor wilt inschakelen.',
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
            ],
        },
        {
            name: 'mute',
            description: 'Schakel de microfoon uit voor een gebruiker.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'gebruiker',
                    description: 'De gebruiker waarvan je de microfoon wilt uitschakelen.',
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
            ],
        },
        {
            name: 'unmute',
            description: 'Schakel de microfoon in voor een gebruiker.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'gebruiker',
                    description: 'De gebruiker waarvan je de microfoon wilt inschakelen.',
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
            ],
        },
    ],

    run: async (client, interaction) => {
        // Subcommand logica
        if (interaction.options.getSubcommand() === 'deafen') {
            const targetUser = interaction.options.getMember('gebruiker');

            try {
                // Controleer of de gebruiker in een spraakkanaal zit
                if (!targetUser.voice.channel) {
                    await interaction.reply({
                        content: 'De gebruiker moet in een spraakkanaal zitten om deze actie uit te voeren.',
                        ephemeral: true,
                    });
                    return;
                }

                // Controleer of de gebruiker al gedeafend is
                if (targetUser.voice.deaf) {
                    await interaction.reply({ content: `${targetUser} is al gedeafend.`, ephemeral: true });
                    return;
                }

                // Schakel het gehoor van de gebruiker uit
                await targetUser.voice.setDeaf(true);
                const embed = new EmbedBuilder().setDescription(`Het gehoor van ${targetUser} is succesvol **uitgeschakeld.**`).setColor(primaryColor)
                await interaction.reply({ embeds: [embed] });
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Er is een fout opgetreden bij het uitschakelen van het gehoor.', ephemeral: true });
            }
        } else if (interaction.options.getSubcommand() === 'undeafen') {
            const targetUser = interaction.options.getMember('gebruiker');

            try {
                // Controleer of de gebruiker in een spraakkanaal zit
                if (!targetUser.voice.channel) {
                    await interaction.reply({
                        content: 'De gebruiker moet in een spraakkanaal zitten om deze actie uit te voeren.',
                        ephemeral: true,
                    });
                    return;
                }

                // Controleer of de gebruiker gedeafend is
                if (!targetUser.voice.deaf) {
                    await interaction.reply({
                        content: `${targetUser.user.tag} is niet gedeafend.`,
                        ephemeral: true,
                    });

                 
                    return;
                }

                // Schakel het gehoor van de gebruiker aan
                await targetUser.voice.setDeaf(false);
                const embed = new EmbedBuilder().setDescription(`Het gehoor van ${targetUser} is succesvol **ingeschakeld.**`).setColor(primaryColor)
                await interaction.reply({ embeds: [embed] });
            } catch (error) {
                await interaction.reply({ content: 'Er is een fout opgetreden bij het inschakelen van het gehoor.', ephemeral: true });
            }
        } else if (interaction.options.getSubcommand() === 'mute') {
            const targetUser = interaction.options.getMember('gebruiker');

            try {
                // Controleer of de gebruiker in een spraakkanaal zit
                if (!targetUser.voice.channel) {
                    await interaction.reply({
                        content: 'De gebruiker moet in een spraakkanaal zitten om deze actie uit te voeren.',
                        ephemeral: true,
                    });
                    return;
                }

                // Controleer of de gebruiker al gedeafend is
                if (targetUser.voice.mute) {
                    await interaction.reply({ content: `${targetUser} is al gemute.`, ephemeral: true });
                    return;
                }

                // Schakel het gehoor van de gebruiker uit
                await targetUser.voice.setMute(true);
                const embed = new EmbedBuilder().setDescription(`Microfoon van ${targetUser} is succesvol **uitgeschakeld.**`).setColor(primaryColor)
                await interaction.reply({ embeds: [embed] });
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Er is een fout opgetreden bij het uitschakelen van de microfoon.', ephemeral: true });
            }
        } else if (interaction.options.getSubcommand() === 'unmute') {
            const targetUser = interaction.options.getMember('gebruiker');

            try {
                // Controleer of de gebruiker in een spraakkanaal zit
                if (!targetUser.voice.channel) {
                    await interaction.reply({
                        content: 'De gebruiker moet in een spraakkanaal zitten om deze actie uit te voeren.',
                        ephemeral: true,
                    });
                    return;
                }

                // Controleer of de gebruiker al gedeafend is
                if (!targetUser.voice.mute) {
                    await interaction.reply({ content: `${targetUser} is al unmuted.`, ephemeral: true });
                    return;
                }

                // Schakel het gehoor van de gebruiker uit
                await targetUser.voice.setMute(false);
                const embed = new EmbedBuilder().setDescription(`Microfoon van ${targetUser} is succesvol **uitgeschakeld.**`).setColor(primaryColor)
                await interaction.reply({ embeds: [embed] });
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Er is een fout opgetreden bij het inschakelen van de microfoon.', ephemeral: true });
            }
        } 

    },
};
