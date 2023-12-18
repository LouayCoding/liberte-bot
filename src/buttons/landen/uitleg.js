
module.exports = {
	id: 'uitleg',
	permissions: [],
	run: async (client, interaction) => {
		interaction.reply({ content: 'Als bot in Flag Guesser op Discord ben ik degene die afbeeldingen van vlaggen naar de spelers stuurt. Mijn taak is om een vlag te laten zien en vervolgens wacht ik op de reacties van de spelers. Ze typen hun antwoord om te raden welk land de vlag vertegenwoordigt. Zodra een speler antwoordt, controleer ik of het juist is. Dan geef ik feedback, zoals het toekennen van punten op basis van de nauwkeurigheid van het geraden antwoord. Mijn rol is om het spel soepel te laten verlopen, de antwoorden te controleren en de score bij te houden terwijl de spelers genieten van het raden van vlaggen!', ephemeral: true})
	}
};