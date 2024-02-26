const { Schema, model } = require('mongoose');

const WebConfigScrapperSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    title_selector: {
        type: String,
        required: true
    },
    artist_selector: {
        type: String,
        required: true
    },
    lyrics_selector: {
        type: String,
        required: true
    },
    chords_selector: {
        type: String,
        required: false
    },
    lyrics_container_selector: {
        type: String,
        required: false // Agregado para especificar el contenedor de las letras
    },
    exclude_selectors: [{
        type: String
    }], // Array de selectores para excluir elementos no deseados
    transformations: [{
        type: Map,
        of: String
    }] // Array de objetos para transformaciones específicas
});

module.exports = model('WebConfigScrapper', WebConfigScrapperSchema);
