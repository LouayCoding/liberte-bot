const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType, ButtonBuilder, ActionRowBuilder, ButtonStyle, InteractionCollector } = require('discord.js');
const Economy = require('discord-economy-super/mongodb');

// Een eenvoudige functie om een willekeurige kaart te trekken
function drawCard() {
    const suits = ['Harten', 'Schoppen', 'Klaveren', 'Ruiten'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Boer', 'Vrouw', 'Koning', 'Aas'];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = '10'
    return { suit, value };
}

// Een functie om de handwaarde te berekenen
function calculateHandValue(hand) {
    let value = 0;
    let aces = 0;

    hand.forEach(card => {
        if (['Boer', 'Vrouw', 'Koning'].includes(card.value)) {
            value += 10;
        } else if (card.value === 'Aas') {
            aces += 1;
        } else {
            value += parseInt(card.value);
        }
    });

    for (let i = 0; i < aces; i++) {
        if (value + 11 <= 21) {
            value += 11;
        } else {
            value += 1;
        }
    }

    return value;
}

module.exports = {
    name: 'blackjack',
    description: "Speel een spelletje blackjack",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "aantal",
            description: "Inleg coins",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const inleg = interaction.options.getString("aantal");
        // Valideer de inleg hier...

        // Start het spel
        const playerHand = [drawCard(), drawCard()];
        let splitHands = [];
        const dealerHand = [drawCard()];

        const playerValue = calculateHandValue(playerHand);
        let embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Blackjack')
            .setDescription(`Je kaarten: ${playerHand.map(card => card.value + ' van ' + card.suit).join(', ')} (Totaal: ${playerValue})`)
            .addFields({ name: 'Dealer kaart', value: dealerHand[0].value + ' van ' + dealerHand[0].suit })
            .addFields({ name: 'Je inzet', value: inleg });

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('hit')
                    .setLabel('Hit')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('stand')
                    .setLabel('Stand')
                    .setStyle(ButtonStyle.Secondary),
            );

        if (canSplit(playerHand)) {
            buttons.addComponents(
                new ButtonBuilder()
                    .setCustomId('split')
                    .setLabel('Split')
                    .setStyle(ButtonStyle.Primary)
            );
        }

        if (canDoubleDown(playerHand)) {
            buttons.addComponents(
                new ButtonBuilder()
                    .setCustomId('double')
                    .setLabel('Double Down')
                    .setStyle(ButtonStyle.Primary)
            );
        }

        function canSplit(hand) {
            return hand.length === 2 && hand[0].value === hand[1].value;
        }

        function canDoubleDown(hand) {
            const handValue = calculateHandValue(hand);
            return hand.length === 2 && [9, 10, 11].includes(handValue);
        }



        await interaction.reply({ embeds: [embed], components: [buttons] });

        async function playHand(hand, interaction, embed, buttons, handDescription) {
            let handValue = calculateHandValue(hand);
            while (handValue < 21) {
                // Update de embed met de huidige hand en waarde
                embed.setDescription(`${handDescription}: ${hand.map(card => card.value + ' van ' + card.suit).join(', ')}\nWaarde: ${handValue}`);
                await interaction.editReply({ embeds: [embed], components: [buttons] });
        
                // Wacht op de keuze van de speler (hit of stand)
                const filter = m => m.author?.id === interaction.user?.id;
                const response = await interaction.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] });
                const choice = response.first().content.toLowerCase();
        
                if (choice === 'hit') {
                    hand.push(drawCard());
                    handValue = calculateHandValue(hand);
                } else if (choice === 'stand') {
                    break;
                }
            }
        
            if (handValue > 21) {
                // De speler is bust
                embed.setDescription(`${handDescription}: Bust!`);
                await interaction.editReply({ embeds: [embed] });
            }
        
            return handValue;
        }

        // Maak een filter voor de InteractionCollector
        const filter = i => {
            i.deferUpdate();
            return i.user.id === interaction.user.id;
        };

        // Maak een collector voor de button interacties
        const collector = new InteractionCollector(client, { interaction, filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'hit') {
                playerHand.push(drawCard());
                const handValue = calculateHandValue(playerHand);

                if (handValue > 21) {
                    // De speler is 'bust'
                    await interaction.editReply({
                        content: `Helaas, je bent bust met een totaal van ${handValue}! Spel afgelopen.`,
                        embeds: [embed],
                        components: []
                    });
                    collector.stop('bust');
                } else if (handValue === 21) {
                    // De speler heeft Blackjack!
                    await interaction.editReply({
                        content: `Gefeliciteerd, je hebt Blackjack met een totaal van ${handValue}! Je wint!`,
                        embeds: [embed],
                        components: []
                    });
                    collector.stop('blackjack');
                } else {
                    // Update het bericht met de nieuwe hand en de totale waarde
                    embed.setDescription(`Je kaarten: ${playerHand.map(card => card.value + ' van ' + card.suit).join(', ')} (Totaal: ${handValue})`);
                    await interaction.editReply({ embeds: [embed], components: [buttons] });
                }
            } else if (i.customId === 'stand') {
                // Voeg logica toe voor de 'stand' actie
                // Dit zou het vergelijken van de hand van de speler met die van de dealer omvatten
                collector.stop('stand');
            } else if (i.customId === 'split' && canSplit(playerHand)) {
                splitHands = [[playerHand[0], drawCard()], [playerHand[1], drawCard()]];  
                embed.setDescription(`Eerste hand: ${splitHands[0].map(card => card.value + ' van ' + card.suit).join(', ')}\nTweede hand: ${splitHands[1].map(card => card.value + ' van ' + card.suit).join(', ')}`);
            
                // Update de knoppen om de 'split' knop te verwijderen
                let updatedButtons = buttons.components.filter(button => button.data.custom_id !== 'split');

                console.log(updatedButtons)


                let actionRow = new ActionRowBuilder().addComponents(updatedButtons);
            
                // Update het bericht met de nieuwe embed en knoppen
                await interaction.editReply({ embeds: [embed], components: [actionRow] });
            
                // Speel de handen
                await playHand(splitHands[0], interaction, embed, updatedButtons, 'Eerste hand');
                await playHand(splitHands[1], interaction, embed, updatedButtons, 'Tweede hand');
            }
             else if (i.customId === 'double' && canDoubleDown(playerHand)) {

                playerHand.push(drawCard());
                const handValue = calculateHandValue(playerHand);

                // Update de embed met de nieuwe hand
                embed.setDescription(`Je kaarten na 'double down': ${playerHand.map(card => card.value + ' van ' + card.suit).join(', ')} (Totaal: ${handValue})`);

                // Aangezien de beurt van de speler eindigt na een 'double down', speel de hand van de dealer uit
                let dealerValue = calculateHandValue(dealerHand);
                while (dealerValue < 17) {
                    dealerHand.push(drawCard());
                    dealerValue = calculateHandValue(dealerHand);
                }

                // Voeg de dealer informatie toe aan de embed
                embed.addFields(
                    { name: 'Dealer kaarten', value: dealerHand.map(card => card.value + ' van ' + card.suit).join(', ') + ` (Totaal: ${dealerValue})` }
                );

                // Voeg resultaat toe aan de embed
                if (handValue > 21) {
                    embed.addFields({ name: 'Resultaat', value: 'Helaas, je bent bust! Spel afgelopen.' });
                } else if (dealerValue > 21 || handValue > dealerValue) {
                    embed.addFields({ name: 'Resultaat', value: 'Je wint!' });
                } else if (handValue < dealerValue) {
                    embed.addFields({ name: 'Resultaat', value: 'Je verliest!' });
                } else {
                    embed.addFields({ name: 'Resultaat', value: 'Gelijkspel!' });
                }

                // Update het bericht
                await interaction.editReply({ embeds: [embed], components: [] });
                collector.stop();
            }
        });

        collector.on('end', async (collected, reason) => {
            let dealerValue = calculateHandValue(dealerHand);

            // Blijf kaarten trekken voor de dealer tot de waarde minimaal 17 is
            while (dealerValue < 17) {
                dealerHand.push(drawCard());
                dealerValue = calculateHandValue(dealerHand);
            }

            let resultMessage = `Jouw hand: ${calculateHandValue(playerHand)}\nDealer hand: ${dealerValue}\nDealer kaarten: ${dealerHand.map(card => card.value + ' van ' + card.suit).join(', ')}\n`;

            if (reason === 'time') {
                await interaction.followUp('Tijd verstreken! Spel afgelopen.');
            } else if (reason === 'bust') {
                resultMessage += 'Helaas, je bent bust! Spel afgelopen.';
            } else if (reason === 'stand') {
                const playerValue = calculateHandValue(playerHand);
                if (dealerValue > 21 || playerValue > dealerValue) {
                    resultMessage += 'Je wint!';
                } else if (playerValue < dealerValue) {
                    resultMessage += 'Je verliest!';
                } else {
                    resultMessage += 'Gelijkspel!';
                }
            }

            await interaction.followUp(resultMessage);
        });
    }
};
