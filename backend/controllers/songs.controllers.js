const Song = require('../models/Song');
const Lyric = require('../models/Lyric');
const LyricChord = require('../models/LyricChord');
const LyricNormalized = require('../models/LyricNormalized');
// aca se definen funcionalidad sobre la db por ejemplo getTask devuele todas la tareas
const getSongs = async (req ,res) => {
    // busca en los valores de task en el json y los trae
    const songs = await Song.find();
    res.json(songs);
};

const createSong = async (req, res) => {
    // Primero, crear y guardar la letra en el formato original.
    const originalLyric = new Lyric({
        // Asumiendo que el modelo Lyric espera un campo `text` con la letra completa.
        text: req.body.lyric
    });
    //const savedOriginalLyric = await originalLyric.save();
    const lyricText = req.body.lyric.text;
    const cleanLyric = lyricText.replace(/<\/?pre>/g, '').trim();
    // Procesar la letra limpia para convertirla en un arreglo de estrofas.
    const lyricsArray = cleanLyric.split('\n\n')
                          .map(verse => verse.trim()) // Limpiar espacios al inicio y al final de cada estrofa.
                          .filter(verse => verse.length > 0) // Filtrar estrofas vacías.
                          .map(verse => verse.replace(/\n/g, ', ')); // Reemplazar saltos de línea dentro de las estrofas.

    // A partir de aquí, continúas con la lógica para crear y guardar la instancia de LyricNormalized y Song como antes.
    const normalizedLyric = new LyricNormalized({
        text: lyricsArray
    });
    // Guardar la letra normalizada en la base de datos.
    await normalizedLyric.save();

    // Crear la canción con referencia a la letra (en este caso, ambos documentos tienen el mismo ID).
    const newSong = new Song({
        title: req.body.title,
        genre: req.body.genre,
        lyric: await normalizedLyric.save(), // ID de la letra, que ahora aplica a ambos formatos.
    });

    // Guardar la canción en la base de datos y enviar la respuesta.
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
    await LyricChord.findOneAndDelete({ song: song._id });
    res.json({'message': 'Song Deleted'});
}

const likeSongs = async (req, res) => {
    const songs = await Song.find( {title: {$regex: req.query.q, $options: 'i'}}).limit(5);
    res.json(songs);
};

const getSongByLyricId = async (req, res) => {
    try {
        // Obtener el lyricID de los parámetros de la solicitud
        const lyricId = req.params.lyricId;

        // Buscar en las canciones que tienen una referencia al lyricId proporcionado
        const song = await Song.findOne({ lyric: lyricId })
        if (!song) {
            return res.status(404).json({ message: "No song found with the provided lyric ID." });
        }

        // Devolver la canción encontrada
        res.json(song);
    } catch (error) {
        console.error('Error searching song by lyric ID:', error);
        res.status(500).json({ message: "Error searching for a song by lyric ID." });
    }
}

const searchSongsByLyricText = async (req, res) => {
    try {
        // Realizar una búsqueda de texto completo en LyricNormalized y proyectar el textScore
        const lyrics = await LyricNormalized.find(
            { $text: { $search: `"${req.query.q}"` } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } }); // Ordenar por relevancia

        // Extraer los IDs de las letras encontradas
        const lyricIds = lyrics.map(lyric => lyric._id);

        // Buscar canciones que coincidan con los IDs de las letras
        const songs = await Song.find(
            { lyric: { $in: lyricIds } }
        );

        res.json(songs);
    } catch (error) {
        console.error('Error searching songs by lyric text:', error);
        res.status(500).json({ message: "Error searching for songs by lyric text." });
    }
};





module.exports = {
    getSongs,
    createSong,
    getSong,
    likeSongs,
    /*updateSong,*/
    deleteSong,
    getSongByLyricId,
    searchSongsByLyricText
}
