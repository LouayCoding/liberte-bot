const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const Economy = require('discord-economy-super/mongodb');

module.exports = {
	name: 'balance',
	description: "Toont het huidige saldo van een gebruiker in de economie.",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: 'gebruiker',
            description: 'De gebruiker die je wilt knuffelen',
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],
	run: async (client, interaction) => {
        const economyUser = interaction.options.get('gebruiker') || interaction.member;	
        const balanceData = client.eco.cache.balance.get({ memberID: interaction.member.id, guildID: interaction.guild.id });
        const [balance, bank] = [balanceData?.money, balanceData?.bank];

        const embed = new EmbedBuilder()
        .setColor('5865F2')
        .setAuthor({ name: `${economyUser.user.username}'s balance`, iconURL: economyUser.user.displayAvatarURL()})
        .addFields(
            { name: 'Cash', value: `€ ${balance || 0}`, inline: true},
            { name: 'Bank', value: `€ ${bank || 0}`, inline: true},
            { name: 'Totaal', value: `€ ${bank + balance || 0}`, inline: true}
        )
        interaction.reply({ embeds: [embed]})
    }
};
