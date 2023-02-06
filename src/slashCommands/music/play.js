const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'play',
    description: "Give someone a slap",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'nummer',
            description: 'The user you want to slap.',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client, interaction) => {
        const nummer = interaction.options.get('nummer')?.value;

        const isAllowed = await client.music.isAllowed(interaction);
        if(!isAllowed) return;
        
        const interactionReturn = await client.music.isLoading(interaction, nummer);
        if(!interactionReturn) return;


        client.distube.play(interaction.member.voice.channel, nummer, {
            interaction,
            metadata: { i: interactionReturn },
            member: interaction.member,
            textChannel: interaction.channel,
        });

    }
};
