const {
    ApplicationCommandType,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ApplicationCommandOptionType
} = require('discord.js');
const { primaryColor, footer } = require('../../config');

module.exports = {
    name: 'role',
    description: "Beheer gebruikersrollen",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'add',
            description: 'Voeg een rol toe aan een gebruiker',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'gebruiker',
                    description: 'De gebruiker aan wie je de rol wilt toevoegen',
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: 'rol',
                    description: 'De rol die je wilt toevoegen',
                    type: ApplicationCommandOptionType.Role,
                    required: true
                }
            ]
        },
        {
            name: 'delete',
            description: 'Verwijder een rol van een gebruiker',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'gebruiker',
                    description: 'De gebruiker van wie je de rol wilt verwijderen',
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: 'rol',
                    description: 'De rol die je wilt verwijderen',
                    type: ApplicationCommandOptionType.Role,
                    required: true
                }
            ]
        }
    ],
    run: async (client, interaction) => {
        const subcommand = interaction.options.getSubcommand();
        const user = interaction.options.getUser('gebruiker');
        const role = interaction.options.getRole('rol');
        const member = await interaction.guild.members.fetch(user.id);
        const embed = new EmbedBuilder().setColor(primaryColor).setTimestamp().setFooter({ text: footer }).setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })

        if (subcommand === 'add') {
            try {
                await member.roles.add(role);
                embed.setDescription(`**Rol ${role} is toegevoegd aan ${user}**`)
                await interaction.reply({ embeds: [embed] });
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Er was een probleem met het toevoegen van de rol.', ephemeral: true });
            }
        } else if (subcommand === 'delete') {
            try {
                await member.roles.remove(role);
                embed.setDescription(`Rol ${role} is verwijderd van ${user}**`)
                await interaction.reply({ embeds: [embed] });
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Er was een probleem met het verwijderen van de rol.', ephemeral: true });
            }
        }
    }

};
