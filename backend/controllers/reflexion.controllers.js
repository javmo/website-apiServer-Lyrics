const Reflexion = require("../models/Reflexion");

// Obtener todas las reflexiones por fecha
const getReflexiones = async (req, res) => {
    try {
        const { fecha } = req.query;
        const reflexiones = await Reflexion.find({ fecha });
        res.json(reflexiones);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las reflexiones", error });
    }
};

// Crear una nueva reflexión
const createReflexion = async (req, res) => {
    try {
        const { fecha, nombre, comentario } = req.body;
        const nuevaReflexion = new Reflexion({ fecha, nombre, comentario });
        await nuevaReflexion.save();
        res.json({ message: "Reflexión agregada" });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la reflexión", error });
    }
};

// Dar like a una reflexión
const likeReflexion = async (req, res) => {
    try {
        const { id } = req.params;
        const reflexion = await Reflexion.findById(id);
        if (!reflexion) return res.status(404).json({ message: "Reflexión no encontrada" });
        
        reflexion.likes += 1;
        await reflexion.save();
        res.json({ message: "Like agregado" });
    } catch (error) {
        res.status(500).json({ message: "Error al dar like", error });
    }
};

// Marcar reflexión como inspiradora
const inspirarReflexion = async (req, res) => {
    try {
        const { id } = req.params;
        const reflexion = await Reflexion.findById(id);
        if (!reflexion) return res.status(404).json({ message: "Reflexión no encontrada" });
        
        reflexion.inspirador += 1;
        await reflexion.save();
        res.json({ message: "Marcado como inspirador" });
    } catch (error) {
        res.status(500).json({ message: "Error al marcar como inspirador", error });
    }
};

// Eliminar una reflexión
const deleteReflexion = async (req, res) => {
    try {
        const { id } = req.params;
        await Reflexion.findByIdAndDelete(id);
        res.json({ message: "Reflexión eliminada" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la reflexión", error });
    }
};

module.exports = {
    getReflexiones,
    createReflexion,
    likeReflexion,
    inspirarReflexion,
    deleteReflexion
};