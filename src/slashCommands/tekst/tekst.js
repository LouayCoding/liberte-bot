const { EmbedBuilder, ButtonStyle, ApplicationCommandOptionType, ActionRowBuilder, ApplicationCommandType, ButtonBuilder, StringSelectMenuBuilder } = require('discord.js');
const { primaryColor } = require('../../config');

module.exports = {
    name: 'tekst',
    description: "Krijg alle details over deze server in een oogopslag!",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'soort',
            description: 's',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'regels',
                    value: 'regels'
                },
                {
                    name: 'picperms',
                    value: 'picperms'
                },
                {
                    name: 'ticket',
                    value: 'ticket'
                },
                {
                    name: 'landen',
                    value: 'landen'
                },
                {
                    name: 'leeftijd',
                    value: 'leeftijd'
                },
                {
                    name: 'games',
                    value: 'games'
                },
                {
                    name: 'kleuren',
                    value: 'kleuren'
                }
            ]
        }
    ],
    run: async (client, interaction) => {
        const soort = interaction.options.getString("soort");


        function generateActionRows(rolesList) {
            let actionRows = [];
            let currentRow = new ActionRowBuilder();

            rolesList.forEach((role, index) => {
                const button = new ButtonBuilder()
                    .setCustomId(role.value);

                // Set emoji if available, otherwise set a label
                if (role.emoji) {
                    button.setEmoji(role.emoji);
                } else {
                    button.setLabel(role.label); // Assuming 'label' is a property of the role object
                }

                button.setStyle(ButtonStyle.Secondary);
                currentRow.addComponents(button);

                // Discord allows a maximum of 5 buttons per row
                if ((index + 1) % 5 === 0) {
                    actionRows.push(currentRow);
                    currentRow = new ActionRowBuilder();
                }
            });

            // Add the last row if it is not empty
            if (currentRow.components.length > 0) {
                actionRows.push(currentRow);
            }

            return actionRows;
        }




        switch (soort) {
            case 'games':
                console.log(soort)
                const rolesGames = [
                    { label: '13-15', value: 'roles-1193567621564616864', emoji: '<:fifa:1193568365336330350>' },
                    { label: '13-15', value: 'roles-1193567712442593320', emoji: '<:horror:1193568461247483915>' },
                    { label: '13-15', value: 'roles-1193567539452727356', emoji: '<:overwatch:1193568498950082571>' },
                    { label: '13-15', value: 'roles-1193567217820909678', emoji: '<:csgo:1193568377365606410>' },
                    { label: '13-15', value: 'roles-1193567157389369434', emoji: '<:Minecraft:1193568110087774230>' },
                    { label: '13-15', value: 'roles-1193567120877965383', emoji: '<:Fortnite:1193570259853115513>' },
                    { label: '13-15', value: 'roles-1193567063013326898', emoji: '<:LoL:1193568211426345091>' },
                    { label: '13-15', value: 'roles-1193566993077506118', emoji: '<:Valorant:1193568084468977776>' },
                    { label: '13-15', value: 'roles-1193723819093934130', emoji: '<:GTA:1193723353534574643>' },
                    { label: '13-15', value: 'roles-1193723859719954504', emoji: '<:rocketleauge:1193723689250857010>' },

                ]
                const actionRowsGames = generateActionRows(rolesGames);

                await interaction.channel.send({ content: 'Selecteer je favoriete games', components: actionRowsGames });
                break;
            case 'leeftijd':
                console.log(soort)
                const rolesLanden = [
                    { label: 'Markokaans', value: 'roles-1145440363021082716', emoji: '🇲🇦' },
                    { label: 'Algerijns', value: 'roles-1145440364489101482', emoji: '🇩🇿' },
                    { label: 'Turks', value: 'roles-1145440365638328430', emoji: '🇹🇷' },
                    { label: 'Iraans', value: 'roles-1145440366582042734', emoji: '🇮🇷' },
                    { label: 'Syriër', value: 'roles-1145440367882289162', emoji: '🇸🇾' },
                    { label: 'Afghaans', value: 'roles-1145440369329307778', emoji: '🇦🇫' },
                    { label: 'Albanees', value: 'roles-1145440370533089360', emoji: '🇦🇱' },
                    { label: 'Spaans', value: 'roles-1145440371359363242', emoji: '🇪🇸' },
                ]
                const actionRowsLanden = generateActionRows(rolesLanden);

                await interaction.channel.send({ content: 'Selecteer je leeftijdsgroep', components: actionRowsLanden });
                break;

            case 'kleuren':
                console.log(soort)
                const rolesKleuren = [
                    { value: 'roles-1145440334160077000', emoji: '<:1_:1194265272291430420>' },
                    { value: 'roles-1145440331630903416', emoji: '<:2_:1194265278066999336>' },
                    { value: 'roles-1145440332893388840', emoji: '<:3_:1194265281598599189>' },
                    { value: 'roles-1145440328501960734', emoji: '<:4_:1194265284110979072>' },
                    { value: 'roles-1145440315382173768', emoji: '<:5_:1194265287688736869>' },
                    { value: 'roles-1145440329357598772', emoji: '<:6_:1194265296882651236>' },
                    { value: 'roles-1145440324920016978', emoji: '<:7_:1194265300506525846>' },
                    { value: 'roles-1145440326127988878', emoji: '<:8_:1194265303035674704>' },
                    { value: 'roles-1145440327591800853', emoji: '<:9_:1194265306504384543>' },
                    { value: 'roles-1145440320893497345', emoji: '<:10:1194265309587189780>' },
                    { value: 'roles-1145440323275870268', emoji: '<:11:1194265311751454831>' },
                    { value: 'roles-1145440323867246685', emoji: '<:12:1194265315949936720>' },
                    { value: 'roles-1145440335049261147', emoji: '<:13:1194265319355715604>' },
                    { value: 'roles-1145440336068497488', emoji: '<:14:1194265321750659174>' },
                    { value: 'roles-1145440337104482344', emoji: '<:15:1194265324707647618>' },
                    { value: 'roles-1145440318540488856', emoji: '<:16:1194265329073922048>' },
                    { value: 'roles-1145440317844234240', emoji: '<:17:1194265332953645166>' },
                    { value: 'roles-1145440316657242253', emoji: '<:18:1194265335021441114>' }



                ]
                const actionRowsKleuren = generateActionRows(rolesKleuren);

                await interaction.channel.send({ content: 'Selecteer je kleur', components: actionRowsKleuren });
                break;
            case 'landen':
                console.log(soort)
                const roles = [
                    { label: 'Markokaans', value: 'roles-1145440363021082716', emoji: '🇲🇦' },
                    { label: 'Algerijns', value: 'roles-1145440364489101482', emoji: '🇩🇿' },
                    { label: 'Turks', value: 'roles-1145440365638328430', emoji: '🇹🇷' },
                    { label: 'Iraans', value: 'roles-1145440366582042734', emoji: '🇮🇷' },
                    { label: 'Syriër', value: 'roles-1145440367882289162', emoji: '🇸🇾' },
                    { label: 'Afghaans', value: 'roles-1145440369329307778', emoji: '🇦🇫' },
                    { label: 'Albanees', value: 'roles-1145440370533089360', emoji: '🇦🇱' },
                    { label: 'Spaans', value: 'roles-1145440371359363242', emoji: '🇪🇸' },
                    { label: 'Indonees', value: 'roles-1145440372386955346', emoji: '🇮🇩' },
                    { label: 'Irakees', value: 'roles-1145440373154533440', emoji: '🇮🇶' },
                    { label: 'Belg', value: 'roles-1145440374433796179', emoji: '🇧🇪' },
                    { label: 'Pools', value: 'roles-1145440375616581773', emoji: '🇵🇱' },
                    { label: 'Nederlander', value: 'roles-1145440376564490271', emoji: '🇳🇱' },
                    { label: 'Russisch', value: 'roles-1145440377508200569', emoji: '🇷🇺' },
                    { label: 'Surinaams', value: 'roles-1145440378812641340', emoji: '🇸🇷' },
                    { label: 'Antiliaan', value: 'roles-1145440380284833823', emoji: '🇨🇼' },
                    { label: 'Somalisch', value: 'roles-1145440381232742462', emoji: '🇸🇴' },
                    { label: 'Italiaans', value: 'roles-1145440382621073609', emoji: '🇮🇹' },
                    { label: 'Palestijns', value: 'roles-1145440383514447993', emoji: '🇵🇸' },
                    { label: 'Armeens', value: 'roles-1145440384583991367', emoji: '🇦🇲' },
                ]


                // Gebruik deze functie om je actierijen te genereren
                const actionRows = generateActionRows(roles);

                await interaction.channel.send({ content: 'Selecteer je afkomst(en)', components: actionRows });
                break;
            case 'regels':
                const regelsEmbed = new EmbedBuilder()
                    .setDescription('**Respectvol Gedrag:** Behandel anderen met respect en vriendelijkheid.\n\n**Geen Exposen:** Deel geen persoonlijke informatie of laster over anderen.\n\n**Geen Naakt of Schokkende Inhoud:** Plaats geen expliciete naaktheid, gore of ongepaste inhoud.\n\n**Geen Opzettelijke Verstoringen:** Het opzettelijk verstoren van gesprekken, zoals het spammen van geluiden, is niet toegestaan.')
                    .setColor('#5865F2')

                const regelsEmbed1 = new EmbedBuilder()
                    .setDescription('**Waarschuwingen:** Na elke reeks van 3 waarschuwingen volgt een timeout van 1 uur. Bij elke reeks van 6 waarschuwingen volgt een timeout van 1 dag. Dit herhaalt zich voor elke set van 6 waarschuwingen.\n\n**Oordeel op Basis van Overtreding:** De ernst van de overtreding bepaalt de acties na waarschuwingen. Het opeenvolgend ontvangen van waarschuwingen kan leiden tot achtereenvolgende timeouts van 1 uur en vervolgens 1 dag.\n\n**Verantwoordelijkheid:** Gebruikers zijn verantwoordelijk voor hun gedrag. Waarschuwingen worden gegeven om naleving van de regels te bevorderen en een veilige omgeving te behouden.**Moderatorbeoordeling:\n\n**Moderators beoordelen elke situatie individueel. Ze hebben de bevoegdheid om passende acties te ondernemen om de server veilig en respectvol te houden.')

                return interaction.channel.send({ embeds: [regelsEmbed, regelsEmbed1] })
                break;
            case 'picperms':
                const picpermsEmbed = new EmbedBuilder()
                    .setTitle('Hoe krijg ik pic perms?')
                    .setDescription('Plaats **.gg/liberte** in je status voor **pic perms** in deze server.')
                    .setColor('#5865F2')
                await interaction.channel.send({ embeds: [picpermsEmbed] });
                return interaction.reply({ content: `**${soort}** tekst succesvol verzonden.`, ephemeral: true });
                break;
            case 'ticket':
                const embed = new EmbedBuilder()
                    .setTitle('Support')
                    .setDescription('Klik op de knop hieronder om een ticket aan te maken. Misbruik van deze functie wordt niet getolereerd en kan leiden tot een ban voor alle gebruikers.')
                    .setColor('#8c8b86');

                const ticketButton = new ButtonBuilder()
                    .setCustomId('ticket')
                    .setLabel('Ticket openen')
                    .setEmoji('📩')
                    .setStyle(ButtonStyle.Secondary);

                const row = new ActionRowBuilder()
                    .addComponents(ticketButton);


                await interaction.channel.send({
                    embeds: [embed],
                    components: [row],
                });
                break;
            default:
                break;
        }



    }
};