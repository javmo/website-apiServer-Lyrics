const { Schema, model } = require('mongoose');

// Actualización del esquema para reflejar que 'text' ahora es un arreglo de cadenas
const LyricNormalizedSchema = new Schema({
    text: [{ type: String, required: true }]
}, {
    collection: 'lyrics_normalized' // Especifica el nombre de la nueva colección
});

module.exports = model('LyricNormalized', LyricNormalizedSchema);
