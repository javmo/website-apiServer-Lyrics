const LyricChord = require('../models/LyricChord');


const getLyricsChord = async (req ,res) => {
    // busca en los valores de task en el json y los trae
    const lyricsChord = await LyricChord.find();
    res.json(lyricsChord);
};

const createLyricChord = async (req, res, next) => {
    // levanta del post el json que se le envia con los campos name y description
    const newLyricChord = new LyricChord({
        song: req.body.song,
        text: req.body.text
    });
    await newLyricChord.save()
        .then(() =>{
            res.json({Chord: 'Chord Saved!'});
        })
        .catch((err) => {
            res.status(400);
            return next(err)});
}

const getLyricChord = async (req, res) => {
    const lyricChord = await LyricChord.findById(req.params.id);
    res.json(lyricChord)
}

const getLyricChordBySongId = async (req, res) => {

    const lyricChord = await LyricChord.findOne({ song:  req.query.songId });
    if(lyricChord == null)
        res.json({text: '[CHORDS NOT FOUND]'});
    else
        res.json(lyricChord);
}

const deleteLyricChord = async (req, res) => {
    const lyricChord = await LyricChord.findByIdAndDelete(req.params.id);
    res.json({'message': 'Song Deleted'});
}

const updateLyricChord = async (req, res) => {
    const result = await LyricChord.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false});

    res.json(result);
};





module.exports = {
    getLyricsChord,
    createLyricChord,
    getLyricChord,
    getLyricChordBySongId,
    deleteLyricChord,
    updateLyricChord
}