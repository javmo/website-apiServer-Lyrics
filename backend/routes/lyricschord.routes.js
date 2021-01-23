const { Router } = require('express');
const  router = Router();



const { getLyricsChord, createLyricChord, getLyricChord, getLyricChordBySongId, deleteSong, likeSongs } = require('../controllers/lyricschord.controllers')

router.get('/bysongid', getLyricChordBySongId);
router.get('/', getLyricsChord);
router.get('/:id', getLyricChord);
router.post('/', createLyricChord);
/*router.get('/search/search', likeSongs);
/!*router.put('/:id', updateSong);*!/
router.delete('/:id', deleteSong);*/

module.exports = router;