const { Schema, model } = require('mongoose');

const ReflexionSchema = new Schema({
    fecha: { type: String, required: true }, // Asociar reflexión a una fecha específica
    nombre: { type: String, default: "Anónimo" },
    comentario: { type: String, required: true },
    likes: { type: Number, default: 0 },
    inspirador: { type: Number, default: 0 },
  }, { timestamps: true });

module.exports = model('Reflexion', ReflexionSchema);
