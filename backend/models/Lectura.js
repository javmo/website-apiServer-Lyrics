const mongoose = require("mongoose");

const LecturaSchema = new mongoose.Schema({
    fecha: { type: String, required: true, unique: true }, // Formato YYYY-MM-DD
    primeraLectura: { type: String, default: "" },
    segundaLectura: { type: String, default: "" },
    evangelio: { type: String, default: "" },
    angelus: { type: String, default: "" }
}, { timestamps: true });

const Lectura = mongoose.model("Lectura", LecturaSchema);

module.exports = Lectura;
