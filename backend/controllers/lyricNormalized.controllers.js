const LyricNormalized = require('../models/LyricNormalized'); // Asegúrate de cambiar la ruta si es necesario

const getLyrics = async (req, res) => {
    // Busca en los valores de lyric en la colección y los trae
    const lyrics = await LyricNormalized.find();
    res.json(lyrics);
};


const createLyric = async (req, res) => {
    // Levanta del POST el JSON que se le envía con el campo text como un arreglo de strings
    const newLyric = new LyricNormalized({
        text: req.body.text // Asegúrate de que 'text' sea enviado como un arreglo
    });
    await newLyric.save();
    res.json({'message': 'Lyric Saved'});
}

const getLyric = async (req, res) => {
    const lyric = await LyricNormalized.findById(req.params.id);
    res.json(lyric);
}

const updateLyric = async (req, res) => {
    // Asegúrate de que el cuerpo de la solicitud contenga 'text' como un arreglo para actualizar correctamente
    const result = await LyricNormalized.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false });
    res.json(result);
}

const deleteLyric = async (req, res) => {
    const lyric = await LyricNormalized.findByIdAndDelete(req.params.id);
    res.json({'message': 'Lyric Deleted'});
}

module.exports = {
    getLyrics,
    createLyric,
    getLyric,
    updateLyric,
    deleteLyric
};
