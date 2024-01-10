const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChannelType, EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const { ticketCategoryId, vrouwenRol, primaryColor } = require('../../config');

module.exports = {
    id: 'ticket',
    permissions: [],
    run: async (client, interaction) => {
        let role;
        let channel;

        let embed;
        let row;


        const value = interaction.values[0];
        console.log(value)

        switch (value) {


            case 'Vrouw':
                role = interaction.guild.roles.cache.get(vrouwenRol);
                channel = await interaction.guild.channels.create({
                    name: interaction.user.username,
                    type: ChannelType.GuildText,
                    parent: ticketCategoryId,
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                            id: '1145426344969257040',
                            deny: [PermissionFlagsBits.ViewChannel],
                        },
                    ],
                    // your permission overwrites or other options here
                });

                interaction.reply({ content: `Ticket kanaal is aangemaakt in ${channel}.`, ephemeral: true });

                embed = new EmbedBuilder()
                    .setDescription(`Hi ${interaction.user} een moderator zal je binnenkort taggen om de verificatie te voltooien. Zodra je bent geverifieerd, krijg je toegang tot de ${role} rol.`)
                    .setColor(primaryColor)

                const acceptButton = new ButtonBuilder()
                    .setCustomId(`accepteren-${interaction.user.id}`)
                    .setLabel('Accepteren')
                    .setStyle(ButtonStyle.Success)

                const closeButton = new ButtonBuilder()
                    .setCustomId('sluiten')
                    .setLabel('Sluiten')
                    .setStyle(ButtonStyle.Danger)

                row = new ActionRowBuilder()
                    .setComponents(acceptButton, closeButton)

                await channel.send({ content: `${interaction.user}`, embeds: [embed], components: [row] })
                break;

            default:
                break;

            case 'Overig':
                role = interaction.guild.roles.cache.get(vrouwenRol);
                channel = await interaction.guild.channels.create({
                    name: interaction.user.username,
                    type: ChannelType.GuildText,
                    parent: ticketCategoryId,
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                            id: '1145426344969257040',
                            deny: [PermissionFlagsBits.ViewChannel],
                        },
                    ],
                    // your permission overwrites or other options here
                });

                interaction.reply({ content: `Ticket kanaal is aangemaakt in ${channel}.`, ephemeral: true });

                const embedOverig = new EmbedBuilder()
                    .setDescription(`Hi ${interaction.user}, laat hier onder weten waarvoor u hulp nodig heeft, en wij zouden ons best doen om zo spoedig antwoord te geven.`)
                    .setColor(primaryColor)

                const closeOverig = new ButtonBuilder()
                    .setCustomId('sluiten')
                    .setLabel('Sluiten')
                    .setStyle(ButtonStyle.Danger)

                const rowOverig = new ActionRowBuilder()
                    .setComponents(closeOverig)

                await channel.send({ content: `${interaction.user}`, embeds: [embedOverig], components: [rowOverig] })
                break;

            case 'minecraft':

                const applicationModal = new ModalBuilder()
                    .setCustomId('minecraft')
                    .setTitle('Minecraft whitelist');

                const nameInput = new TextInputBuilder()
                    .setCustomId('username')
                    .setLabel('Wat is je minecraft gebruikersnaam?')
                    .setStyle(TextInputStyle.Short);

                const firstRow = new ActionRowBuilder().addComponents(nameInput);
                applicationModal.addComponents(firstRow);

                await interaction.showModal(applicationModal);
               

        }




    },
}
