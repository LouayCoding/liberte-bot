const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const mongoose = require('mongoose');
const { boostRoleId } = require('../../config');

module.exports = {
    name: 'boost',
    description: "Create, edit, or delete a custom role with a name and color",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'rol',
            description: 'Beheer de custom rol',
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: 'create',
                    description: 'Maak een nieuwe rol aan',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'naam',
                            description: 'De naam van de nieuwe rol',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        },
                        {
                            name: 'kleur',
                            description: 'De hex kleurcode voor de rol (bv. #ff0000)',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        },
                        {
                            name: 'emoji',
                            description: 'De nieuwe hex kleurcode voor de rol (bv. #00ff00)',
                            type: ApplicationCommandOptionType.Attachment,
                            required: false
                        }
                    ]
                },
                {
                    name: 'edit',
                    description: 'Bewerk een bestaande rol',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'naam',
                            description: 'De naam van de rol die je wilt bewerken',
                            type: ApplicationCommandOptionType.String,
                            required: false
                        },
                        {
                            name: 'kleur',
                            description: 'De nieuwe hex kleurcode voor de rol (bv. #00ff00)',
                            type: ApplicationCommandOptionType.String,
                            required: false
                        },
                        {
                            name: 'emoji',
                            description: 'De nieuwe hex kleurcode voor de rol (bv. #00ff00)',
                            type: ApplicationCommandOptionType.Attachment,
                            required: false
                        }
                    ]
                },
                {
                    name: 'delete',
                    description: 'Verwijder een bestaande rol',
                    type: ApplicationCommandOptionType.Subcommand,
                },
            ]
        }
    ],
    run: async (client, interaction) => {
        const subCommand = interaction.options.getSubcommand();

        if (subCommand === 'create') {
            const roleScheiding = interaction.guild.roles.cache.get('1145482969914544138').position;
            const roleName = interaction.options.getString('naam');
            const roleColor = interaction.options.getString('kleur');
            const roleEmoji = interaction.options.getAttachment('emoji')



            // Controleren of de kleur geldig is
            if (!/^#[0-9A-F]{6}$/i.test(roleColor)) {
                return interaction.reply({ content: 'Ongeldige kleurcode. Gebruik een hex code, bijvoorbeeld #ff0000', ephemeral: true });
            }

            try {
                // Controleren of de gebruiker al een booster rol heeft
                let user = await mongoose.model('User').findOne({ userId: interaction.user.id });

                if (!user) {
                    // Aanmaken van een nieuwe gebruiker
                    user = new (mongoose.model('User'))({
                        userId: interaction.user.id,
                    });

                    await user.save();
                }

                if (user.boosterRoleId) {
                    return interaction.reply({ content: 'Je hebt al een booster rol.', ephemeral: true });
                }

                const roleOptions = {
                    name: roleName,
                    color: roleColor,
                    position: roleScheiding - 1
                };

                if (roleEmoji) {
                    roleOptions.icon = roleEmoji.url;
                }


                const role = await interaction.guild.roles.create(roleOptions);


                await interaction.member.roles.add(role);

               
                user.boosterRoleId = role.id;

                await user.save();

                await interaction.reply({ content: `Rol ${role} succesvol aangemaakt met kleur **${roleColor}**`, ephemeral: true });

            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Er is een fout opgetreden bij het aanmaken van de rol.', ephemeral: true });
            }
        } else if (subCommand === 'edit') {
            const roleName = interaction.options.getString('naam');
            const roleColor = interaction.options.getString('kleur');
            const roleEmoji = interaction.options.getAttachment('emoji')

            try {
                const user = await mongoose.model('User').findOne({ userId: interaction.user.id });
                const roleId = user.boosterRoleId;

                if (!roleId) {
                    return interaction.reply({ content: 'Je hebt geen booster rol om te bewerken.', ephemeral: true });
                }

                const role = interaction.guild.roles.cache.get(roleId);
                if (!role) {
                    user.boosterRoleId = null;
                    await user.save();
                    return interaction.reply({ content: 'De booster rol bestaat niet meer.', ephemeral: true });
                }

                const updatedOptions = {};
                if (roleName) {
                    updatedOptions.name = roleName;
                }

                if (roleColor && /^#[0-9A-F]{6}$/i.test(roleColor)) {
                    updatedOptions.color = roleColor;
                }

                if (roleEmoji) {
                    updatedOptions.icon = roleEmoji.url;
                }

                await role.edit(updatedOptions);
                await user.save();

                await interaction.reply({ content: `Booster rol <@&${roleId}> is bijgewerkt met ${roleName ? 'naam: **' + roleName + '**' : ''}${roleColor ? ' en kleur: **' + roleColor + '**' : ''}${roleEmoji ? 'en een nieuw **emoji**' : ''}.`, ephemeral: true });

            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Er is een fout opgetreden bij het bewerken van de rol.', ephemeral: true });
            }
        } else if (subCommand === 'delete') {
            try {
                const user = await mongoose.model('User').findOne({ userId: interaction.user.id });
                const roleId = user.boosterRoleId;


                if (!roleId) {
                    return interaction.reply({ content: 'Je hebt geen booster rol om te verwijderen.', ephemeral: true });
                }

                const role = interaction.guild.roles.cache.get(roleId);
                if (!role) {
                    user.boosterRoleId = null;
                    await user.save();
                    return interaction.reply({ content: 'De booster rol bestaat niet meer.', ephemeral: true });
                }

                await role.delete();
                user.boosterRoleId = null;
                await user.save();

                await interaction.reply({ content: 'Booster rol is verwijderd.', ephemeral: true });

            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Er is een fout opgetreden bij het verwijderen van de rol.', ephemeral: true });
            }

        }
    }
};
