const { EmbedBuilder } = require("discord.js");
const client = require("..");
const { boostChannelId } = require("../config");

client.on("guildMemberUpdate", async (oldMember, newMember) => {
    // Check if the member wasn't boosting before, but is now.
    if (!oldMember.premiumSince && newMember.premiumSince) {
        const channel = oldMember.guild.channels.cache.get(boostChannelId);
        if (!channel) return; 
        
        const embed = new EmbedBuilder()
            .setDescription(`${newMember} dank je wel voor het boosten van de server! Je kunt de </boost rol create:1194684491088797777> gebruiken om je eigen aangepaste rol te creëren.`)
            .setColor('#f47fff');

        const bericht = await channel.send({ content: `${newMember}` });
        await bericht.delete();
        channel.send({ embeds: [embed] });
    }
});
