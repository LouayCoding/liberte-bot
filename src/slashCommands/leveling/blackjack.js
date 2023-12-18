const { MessageEmbed } = require('discord.js');
const Blackjack = require('simply-blackjack');

module.exports = {
    name: 'blackjack',
    description: "Speel een potje Blackjack!",
    run: async (client, interaction) => {
        const Game = new Blackjack({
            decks: 3,
            payouts: {
                blackjack: 1.5,
                default: 1
            }
        });

        Game.bet(20);
        let cards = Game.start();
        

        console.log(cards);
        Game.hit();
        console.log(cards);
        Game.hit();
        console.log(cards);
    }
};


