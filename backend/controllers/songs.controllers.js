const Song = require('../models/Song');
const Lyric = require('../models/Lyric');

// aca se definen funcionalidad sobre la db por ejemplo getTask devuele todas la tareas
const getSongs = async (req ,res) => {
    // busca en los valores de task en el json y los trae
    const songs = await Song.find();
    res.json(songs);
};

const createSong = async (req, res) => {
    // levanta del post el json que se le envia con los campos name y description
   // console.log(req);
    const newSong = new Song({
        title: req.body.title,
        genre: req.body.genre,
        // se graba la letra previo a grabar la cancion
        lyric: await new Lyric(req.body.lyric).save()
    });

    res.json(await newSong.save());
}

const getSong = async (req, res) => {
    const song = await Song.findById(req.params.id);
    if(song == null)
        res.json({title: '[SONG NOT FOUND]'});
    else
        res.json(song);
}


/*const updateSong = async (req, res) => {
    const result = await getConnection().get('songs').find({id: req.params.id})
        // asigna al lo que viene en el body al id que encontro en tabla tasks
        .assign(req.body)
        // graba el registro actualizado
        .write();
    res.json(result);
}*/

const deleteSong = async (req, res) => {
    const song = await Song.findByIdAndDelete(req.params.id);
    // tambien de elimina la letra
    await Lyric.findByIdAndDelete(song.lyric._id);
    res.json({'message': 'Song Deleted'});
}

const likeSongs = async (req, res) => {
    const songs = await Song.find( {title: {$regex: req.query.q, $options: 'i'}}).limit(5);
    res.json(songs);
};

module.exports = {
    getSongs,
    createSong,
    getSong,
    likeSongs,
    /*updateSong,*/
    deleteSong
}
