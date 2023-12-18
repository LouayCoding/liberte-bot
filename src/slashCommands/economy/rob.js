const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const Economy = require('discord-economy-super/mongodb');

module.exports = {
    name: 'rob',
    description: "Probeer geld te stelen van andere gebruikers.",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'gebruiker',
            description: 'De gebruiker die je wilt beroven.',
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
	run: async (client, interaction) => {
        let user = client.eco.cache.users.get({
            memberID: interaction.member.id,
            guildID: interaction.guild.id
        });

        let targetUser = client.eco.cache.users.get({
            memberID: interaction.options.get('gebruiker').member.id,
            guildID: interaction.guild.id
        });

        const successRate = 0.3; // Example: 30% chance of success
        if (Math.random() < successRate) {
            const stolenAmount = Math.floor(Math.random() * 100) + 1; // Steal random amount between 1 to 100
            
            // Perform the transaction - deduct coins from the target user and add to the robber's balance
            await targetUser.balance.subtract(stolenAmount, `robbed by ${interaction.user.username}`);
            await user.balance.add(stolenAmount, `stole ${stolenAmount} coins from ${targetUser.tag}`);
    
            return interaction.channel.send(
                `${interaction.member}, you successfully stole **${stolenAmount}** coins from ${targetUser.username}.`
            );
        } else {
            const lostAmount = Math.floor(Math.random() * 50) + 1; // Example: Losing random amount between 1 to 50
            await user.balance.subtract(lostAmount, `failed to rob ${targetUser.tag}`);
            
            return interaction.channel.send(
                `${interaction.member}, your attempt to rob ${targetUser.username} failed. You lost **${lostAmount}** coins.`
            );
        }

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
