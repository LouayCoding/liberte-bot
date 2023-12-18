const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { checkMod } = require('../../utils/permissions');
const { logChannelId } = require('../../config');

module.exports = {
    name: 'untimeout',
    description: "Haal een gebruiker uit de timeout in de server.",
    options: [
        {
            name: 'gebruiker',
            description: 'De gebruiker die uit de timeout moet worden gehaald.',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const targetUser = interaction.options.getUser('gebruiker');
        const targetMember = interaction.options.getMember('gebruiker');
        if (!targetMember.communicationDisabledUntil) return interaction.reply({ content: `${targetUser.tag} is niet getimeout.`, ephemeral: true });
        
        targetMember.timeout(null).then(console.log).catch(console.error);

        // Verwijderen van de timeout rol of het herstellen van de rechten van de gebruiker
        // Implementeer hier de code om de gebruiker uit de timeout te halen

        try {
            const instantEmbed = new EmbedBuilder()
                .setColor('5865F2')
                .setAuthor({ name: `${targetUser.tag}, is uit de timeout gehaald!`, iconURL: targetUser.displayAvatarURL() });

            const logEmbed = new EmbedBuilder()
                .setColor('5865F2')
                .setAuthor({ name: `[UNTIMEOUT] ${targetUser.tag}`, iconURL: targetUser.displayAvatarURL() })
                .setDescription(`${targetUser.tag} is uit de timeout gehaald door ${interaction.user.tag}`)
                .setFooter({ text: `ID: ${targetUser.id}` })

            const logChannel = interaction.guild.channels.cache.get(logChannelId);

            if (logChannel) {
                await logChannel.send({ embeds: [logEmbed] });
            } else {
                console.log('Logkanaal niet gevonden');
            }

            await interaction.reply({ embeds: [instantEmbed] });
            await targetUser.send({ embeds: [logEmbed] });
        } catch (error) {
            console.log(error);
            interaction.reply({ content: 'Er is een fout opgetreden tijdens het uitvoeren van dit commando.', ephemeral: true });
        }
    }
};
