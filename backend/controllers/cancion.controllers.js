const Cancion = require("../models/Cancion");

// Obtener todas las canciones por fecha
const getCanciones = async (req, res) => {
    try {
        const { fecha } = req.query;
        const canciones = await Cancion.find({ fecha });
        res.json(canciones);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las canciones", error });
    }
};

// Obtener una canción por su ID
const getCancionById = async (req, res) => {
    try {
        const { id } = req.params;
        const cancion = await Cancion.findById(id);
        if (!cancion) return res.status(404).json({ message: "Canción no encontrada" });

        res.json(cancion);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la canción", error });
    }
};

// Crear una nueva canción recomendada
const createCancion = async (req, res) => {
    try {
        const { fecha, nombre, titulo, link } = req.body;
        const nuevaCancion = new Cancion({ fecha, nombre, titulo, link });
        await nuevaCancion.save();
        res.json({ message: "Canción agregada" });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la canción", error });
    }
};

// Eliminar una canción
const deleteCancion = async (req, res) => {
    try {
        const { id } = req.params;
        await Cancion.findByIdAndDelete(id);
        res.json({ message: "Canción eliminada" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la canción", error });
    }
};

module.exports = {
    getCanciones,
    getCancionById,
    createCancion,
    deleteCancion
};
