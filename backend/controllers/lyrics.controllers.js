
const Lyric = require('../models/Lyric');


const getLyrics = async (req ,res) => {
    // busca en los valores de task en el json y los trae
    const lyrics = await Lyric.find();
    res.json(lyrics);
};

const createLyric = async (req, res) => {
    // levanta del post el json que se le envia con los campos name y description
    const newLyric = new Lyric({
        text: req.body.text
    });
    await newLyric.save();
    res.json({'message': 'Lyric Saved'});
}

const getLyric = async (req, res) => {
    const lyric = await Lyric.findById(req.params.id);
    res.json(lyric)
}

const updateLyric = async (req, res) => {
    const result = await getConnection().get('lyrics').find({id: req.params.id})
        // asigna al lo que viene en el body al id que encontro en tabla tasks
        .assign(req.body)
        // graba el registro actualizado
        .write();
    res.json(result);
}

const deleteLyric = async (req, res) => {
    const lyric = await Lyric.findByIdAndDelete(req.params.id);
    res.json({'message': 'Lyric Deleted'});
}

module.exports = {
    getLyrics,
    createLyric,
    getLyric,
    updateLyric,
    deleteLyric
}