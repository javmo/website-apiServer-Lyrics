const Chord = require('../models/chord'); // Asegúrate de que el modelo se llama 'Chord'

// Controlador para obtener todos los acordes
exports.getAllChords = async (req, res) => {
    try {
        const chords = await Chord.find();
        res.json(chords);
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
};

// Controlador para obtener un acorde por songId
exports.getChordBySongId = async (req, res) => {
    try {
        const chord = await Chord.find({ songId: req.params.songId });
        if (!chord) {
            res.status(404).send('No se encontró el acorde con el ID de canción proporcionado');
        } else {
            res.json(chord);
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
};

// Controlador para buscar acordes por título
exports.searchChordsByTitle = async (req, res) => {
    try {
        const title = req.query.title;
        const chords = await Chord.find({ title: { $regex: title, $options: 'i' } });
        res.json(chords);
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
};
