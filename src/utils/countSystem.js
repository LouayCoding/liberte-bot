const { PermissionsBitField, messageLink, EmbedBuilder } = require('discord.js');
const config = require('../config');
const regex = new RegExp(/^\d+$/);
const mongoose = require('mongoose');

const countSchema = new mongoose.Schema({
    count: Number,
    lastMember: String,
});

// Maak het Mongoose-model aan op basis van het schema
const Count = mongoose.model('Count', countSchema);

const saveToDatabase = async () => {
    try {
        await Count.findOneAndUpdate({}, cachedData, { upsert: true });
    } catch (error) {
        console.error('Fout bij opslaan in de database:', error);
    }
};

let cachedData = {
    count: 0,
    lastMember: null,
};

const loadFromDatabase = async () => {
    try {
      const data = await Count.findOne({});
      if (data) {
        cachedData.count = data.count || 0;
        cachedData.lastMember = data.lastMember || null;
        console.log('Gegevens geladen vanuit de database.');
      }
    } catch (error) {
      console.error('Fout bij laden uit de database:', error);
    }
  };
  
  // Laad de gegevens bij opstarten van de applicatie
  loadFromDatabase();



const getCountData = () => {
    return cachedData;
};

const updateCountData = (count, lastMember) => {
    cachedData.count = count;
    cachedData.lastMember = lastMember;
};

setInterval(() => {
    saveToDatabase();
  }, 60000);

// Functie om te controleren of de gebruiker beheerdersrechten heeft en/of een mod-rol heeft
const countSystem = async (message) => {
    const errorEmbed = new EmbedBuilder().setDescription('Oeps! Terug naar start! Laten we opnieuw beginnen vanaf **0**. Volgende keer gaan we voor goud!✨').setColor('ff0000')

    const countChannel = config.countChannelId;
    const channel = message.guild.channels.cache.get(config.countChannelId);

    if (channel.id !== countChannel) return;
    if (!regex.test(message.content)) return;

    const number = parseInt(message.content);

    const { count, lastMember } = getCountData();

    if (message.author.id === lastMember) {
        updateCountData(0, null);
        await message.react('❌');
        return await message.channel.send({ embeds: [errorEmbed] });
    }

    if (number !== count + 1) {
        updateCountData(0, null);
        await message.react('❌');
        return await message.channel.send({ embeds: [errorEmbed] });
    }

    // Bij een correct opeenvolgend bericht, update de teller en de laatste gebruiker
    updateCountData(number, message.author.id);

    await message.react('✅');
};

module.exports = { countSystem };
