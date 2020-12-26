const LyricPublish = require('../models/LyricPublish');
const Category = require('../models/Category');

// aca se definen funcionalidad sobre la db por ejemplo getTask devuele todas la tareas
const getLyricsPublish = async (req ,res) => {
    // busca en los valores de task en el json y los trae
    const lyricsPub = await LyricPublish.find();
    res.json(lyricsPub);
};

const createLyricPublish = async (req, res) => {
    // levanta del post el json que se le envia con los campos name y description
    const newLyricPub = new LyricPublish({
        song: req.body.song,
        category: req.body.category
    });
    // si no viene una categoria se le asigna una al azar
    if(newLyricPub.category == null)
         newLyricPub.category = await Category.findOne();

    await newLyricPub.save()
    res.json({'message': 'Lyric Published'});
};

const findByCategory = async (req, res) => {
    console.log(req.query.q);
    const lyricsPub = await LyricPublish.find({category: req.query.q});
    console.log(lyricsPub);
    res.json(lyricsPub);

};

const getLyricPublish = async (req, res) => {
    const lyricPub = await LyricPublish.findById(req.params.id);
    if(lyricPub == null)
        res.json({song: '[SONG NOT FOUND]'});
    else
        res.json(lyricPub);
};

const updateLyricPublish = async (req, res) => {
    const result = await LyricPublish.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false});

    res.json(result);
};

const deleteLyricPublish = async (req, res) => {
    const lyricPub = await LyricPublish.findByIdAndDelete(req.params.id);
    res.json({'message': 'Lyric  unpublished'});
};


module.exports = {
    getLyricsPublish,
    createLyricPublish,
    findByCategory,
    getLyricPublish,
    updateLyricPublish,
    deleteLyricPublish
}
