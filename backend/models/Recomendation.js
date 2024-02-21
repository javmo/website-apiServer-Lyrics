const { Schema, model } = require('mongoose');

// Define un esquema subdocumento para las recomendaciones individuales
const RecomendationDetailSchema = new Schema({
    id_cancion: { type: Schema.Types.ObjectId, required: true, ref: 'Song' }, // Asume que 'Cancion' es tu modelo de canción
    similitud: { type: Number, required: true }
}, { _id: false }); // _id: false porque no necesitamos un id separado para cada recomendación

// Define el esquema principal para las recomendaciones
const RecomendationSchema = new Schema({
    lectura: { type: String, required: true }, // 'Primera lectura', 'Salmo', etc.
    detalles: [RecomendationDetailSchema], // Un array de recomendaciones
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Recomendation', RecomendationSchema);