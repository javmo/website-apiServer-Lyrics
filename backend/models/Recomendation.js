const { Schema, model } = require('mongoose');

// Define un esquema subdocumento para las recomendaciones individuales
const RecomendationDetailSchema = new Schema({
    id_cancion: { type: Schema.Types.ObjectId, required: true, ref: 'Song' },
    similitud: { type: Number, required: true }
}, { _id: false });

// Define un esquema subdocumento para las lecturas
const LecturaSchema = new Schema({
    tipo_lectura: { type: String, required: true }, // Por ejemplo: 'Primera lectura', 'Salmo', etc.
    detalles: [RecomendationDetailSchema]
}, { _id: false });

// Define el esquema principal para las recomendaciones
const RecomendationSchema = new Schema({
    lecturas: [LecturaSchema], // Un array de lecturas, cada una con sus recomendaciones
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Recomendation', RecomendationSchema);

