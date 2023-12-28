const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChannelType, EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const { ticketCategoryId, vrouwenRol } = require('../../config');

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

            case 'Vrouw':
                const role = interaction.guild.roles.cache.get(vrouwenRol);
                const channel = await interaction.guild.channels.create({
                    name: interaction.user.username,
                    type: ChannelType.GuildText,
                    parent: ticketCategoryId,
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                            id: '1181713621202522162',
                            deny: [PermissionFlagsBits.ViewChannel],
                        },
                    ],
                    // your permission overwrites or other options here
                });

                interaction.reply({ content: `Ticket kanaal is aangemaakt in ${channel}.`, ephemeral: true });

                const embed = new EmbedBuilder()
                    .setDescription(`Hi ${interaction.user} een moderator zal je binnenkort taggen om de verificatie te voltooien. Zodra je bent geverifieerd, krijg je toegang tot de ${role} en kun je genieten van onze speciale community!`)
                    .setColor('#5865F2')

                const acceptButton = new ButtonBuilder()
                    .setCustomId(`accepteren-${interaction.user.id}`)
                    .setLabel('Accepteren')
                    .setStyle(ButtonStyle.Success)

                const closeButton = new ButtonBuilder()
                    .setCustomId('sluiten')
                    .setLabel('Sluiten')
                    .setStyle(ButtonStyle.Danger)

                const row = new ActionRowBuilder()
                    .setComponents(acceptButton, closeButton)

                await channel.send({ embeds: [embed], components: [row] })
                break;

            default:
                break;
        }


    },
}
