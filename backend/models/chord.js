const { Schema, model } = require('mongoose');

const PartSchema = new Schema({
    letra: { type: String, required: true },
    acordes: [{ type: String, required: true }]
});

const ChordSchema = new Schema({
    title: { type: String, required: true },
    autores: [{ type: String }],
    interprete: { type: String, required: true },
    album: { type: String, required: true },
    tono: { type: String, required: true },
    idPastoralMusica: { type: String, required: true },
    url: { type: String, required: true },
    partes: [PartSchema],
    songId: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Chords', ChordSchema);
