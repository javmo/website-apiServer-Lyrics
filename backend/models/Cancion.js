const { Schema, model } = require('mongoose');

const CancionSchema = new Schema({
    fecha: { type: String, required: true }, // Asociar canción a una fecha específica
    nombre: { type: String, default: "Anónimo" },
    titulo: { type: String, required: true },
    link: { type: String, required: true },
  }, { timestamps: true });

module.exports = model('Cancion', CancionSchema);


