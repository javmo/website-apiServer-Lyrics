const WebConfigScrapper = require('../models/WebConfigScrapper'); // Importa el modelo

// Añadir nueva configuración
exports.createConfig = async (req, res) => {
    try {
        const { url, title_selector, artist_selector, lyrics_selector } = req.body;
        const newConfig = new WebConfigScrapper({
            url,
            title_selector,
            artist_selector,
            lyrics_selector
        });
        const savedConfig = await newConfig.save();
        res.status(201).json(savedConfig);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la configuración', error: error.message });
    }
};

// Obtener todas las configuraciones
exports.getAllConfigs = async (req, res) => {
    try {
        const configs = await WebConfigScrapper.find();
        res.json(configs);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las configuraciones', error: error.message });
    }
};

// Obtener una configuración específica por ID
exports.getConfigById = async (req, res) => {
    try {
        const config = await WebConfigScrapper.findById(req.params.id);
        if (!config) {
            return res.status(404).json({ message: 'Configuración no encontrada' });
        }
        res.json(config);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la configuración', error: error.message });
    }
};

// Actualizar una configuración existente
exports.updateConfig = async (req, res) => {
    try {
        const updatedConfig = await WebConfigScrapper.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedConfig) {
            return res.status(404).json({ message: 'Configuración no encontrada' });
        }
        res.json(updatedConfig);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la configuración', error: error.message });
    }
};

// Eliminar una configuración
exports.deleteConfig = async (req, res) => {
    try {
        const deletedConfig = await WebConfigScrapper.findByIdAndDelete(req.params.id);
        if (!deletedConfig) {
            return res.status(404).json({ message: 'Configuración no encontrada' });
        }
        res.status(204).json({ message: 'Configuración eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la configuración', error: error.message });
    }
};

exports.getConfigByUrl = async (req, res) => {
    try {
        const { url } = req.params; // Asumiendo que pasas la URL como un parámetro en la ruta.
        const config = await WebConfigScrapper.findOne({ url: url });

        if (!config) {
            return res.status(404).json({ message: 'Configuración no encontrada para la URL proporcionada' });
        }

        res.json(config);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar la configuración por URL', error: error.message });
    }
};
