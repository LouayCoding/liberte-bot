module.exports = {
    name: 'invite',
    description: "Stuur een uitnodigingslink naar de server.",
    run: async (client, interaction) => {
        await interaction.reply({ content: 'discord.gg/dirham' });
    }
};
