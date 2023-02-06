const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, StringSelectMenuBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'country',
    description: "Give someone a slap",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {

        const object = {
            nl: '🇳🇱',
            de: '🇩🇪',
            fr: '🇫🇷',
            es: '🇪🇸',
            cn: '🇨🇳',
            dz: '🇩🇿',
            ma: '🇲🇦',
            tr: '🇹🇷',
            tn: '🇹🇳',
            sr: '🇸🇷',
            cw: '🇨🇼',
            eg: '🇪🇬',
            iq: '🇮🇶',
            ir: '🇮🇷',
            so: '🇸🇴',
            be: '🇧🇪',
            ye: '🇾🇪',
            us: '🇺🇸',
            gb: '🇬🇧',
            jp: '🇯🇵',
            ru: '🇷🇺',
            pl: '🇵🇱',
            in: '🇮🇳',
            ng: '🇳🇬',
            sd: '🇸🇩',
        };
        

            const rowss = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('select')
                        .setPlaceholder('Nothing selected')
                        .addOptions(
                            {
                                label: 'Select me',
                                description: 'This is a description',
                                value: 'first_option',
                            },
                        ),
                );

        



        // const embed = new EmbedBuilder()
        //     .setAuthor({ name: 'Ticket', iconURL: client.user.displayAvatarURL() })
        //     .setColor(client.config.primaryColor)
        //     .setDescription('Klik op de knop hieronder om een ticket aan te maken. Misbruik van deze functie wordt niet getolereerd en kan leiden tot een ban voor alle gebruikers.')

        // interaction.channel.send({ embeds: [embed], components: [row] });
    }
};
