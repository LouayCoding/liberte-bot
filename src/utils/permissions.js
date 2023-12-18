const { PermissionsBitField } = require('discord.js');
const modRoles = ['1181783092428558376'];

// Functie om te controleren of de gebruiker beheerdersrechten heeft en/of een mod-rol heeft
const checkMod = async (interaction) => {
    const member = interaction.member;

    if (!member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
        return { allowed: false, reason: 'Je hebt geen rechten om gebruikers te verbannen.' };
    }

    const targetUser = interaction.options.getUser('gebruiker');
    const targetMember = interaction.guild.members.cache.get(targetUser.id);

    if (targetMember.permissions.has(PermissionsBitField.Flags.BanMembers)) {
        return { allowed: false, reason: 'Je kunt geen andere moderators verbannen.' };
    }

    const targetRoles = targetMember.roles.cache.map(role => role.id);

    if (targetRoles.some(roleId => modRoles.includes(roleId))) {
        return { allowed: false, reason: 'Je kunt geen andere moderators verbannen.' };
    }

    return { allowed: true };
};

module.exports = { checkMod };
