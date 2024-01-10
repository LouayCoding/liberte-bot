const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const User = require('../../models/userModel'); // Importeer je Mongoose User-model
const { primaryColor, dirham } = require('../../config');

module.exports = {
    name: 'wallet',
    description: 'Bekijk je wallet met je saldo en cryptocurrencies.',
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {
        const { user } = interaction;

        let userData = await User.findOne({ userId: user.id });

        if (!userData) {
            interaction.reply({ content: 'Je hebt nog geen balans.', ephemeral: true });
            return;
        }

        const embed = new EmbedBuilder()
            .setColor(primaryColor)
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
            .addFields([
                { name: 'Saldo', value: `${dirham} ${userData.balance.toFixed(2)}` }
            ]);

        if (userData.coins.length > 0) {
            const coinInfo = userData.coins.map(coin => `**${coin.symbol}:** ${coin.balance.toFixed(6)}`);
            embed.addFields([{ name: 'Crypto', value: coinInfo.join('\n') }]);
        } else {
            embed.addFields([{ name: 'Crypto', value: 'Je hebt geen cryptocurrencies.' }]);
        }

        interaction.reply({ embeds: [embed] });
    },
};
