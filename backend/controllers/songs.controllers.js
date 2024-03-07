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
    const lyricText = req.body.lyric.text;
    // Limpieza inicial de etiquetas HTML si existen
    const cleanLyric = lyricText.replace(/<\/?pre>/g, '').trim();

    // Dividir por líneas primero
    let lines = cleanLyric.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // Intentar identificar pausas naturales para nuevas estrofas
    let lyricsArray = [];
    let currentVerse = [];
    lines.forEach((line, index) => {
        currentVerse.push(line);
        // Si la línea termina con un signo de puntuación fuerte o es significativamente más corta que la anterior, considerar como el final de una estrofa
        if (/\.(?!\d)|!|\?/.test(line) || (lines[index + 1] && line.length > 4 && lines[index + 1].length < line.length / 2)) {
            lyricsArray.push(currentVerse.join(', '));
            currentVerse = [];
        }
    });

    // Asegurarse de incluir la última estrofa si no termina con un signo de puntuación fuerte
    if (currentVerse.length > 0) {
        lyricsArray.push(currentVerse.join(', '));
    }

    // El resto del proceso de creación y guardado de la canción...
    const normalizedLyric = new LyricNormalized({
        text: lyricsArray
    });
    const newSong = new Song({
        title: req.body.title,
        genre: req.body.genre,
        lyric: await normalizedLyric.save(), // ID de la letra, que ahora aplica a ambos formatos.
    });

    // Guardar la letra normalizada y crear la canción...
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
    await LyricNormalized.findOneAndDelete({ lyric: song.lyric._id });
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
