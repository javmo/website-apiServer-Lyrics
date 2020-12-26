const Genre = require('../models/Genre');

// aca se definen funcionalidad sobre la db por ejemplo getTask devuele todas la tareas
const getGenres = async (req ,res) => {
    const genres = await Genre.find();
    res.json(genres);
};

const getGenre = async (req ,res) => {
    const genre = await Genre.findById(req.params.id);
    res.json(genre);
};

const createGenre = async (req, res) => {
    // levanta del post el json que se le envia con los campos name y description
    const { name } = req.body;
    const newGenre = new Genre({name})
    await newGenre.save();
    res.json({'message': 'Genre Saved'});
}

module.exports = {
    getGenres,
    createGenre,
    getGenre
}
