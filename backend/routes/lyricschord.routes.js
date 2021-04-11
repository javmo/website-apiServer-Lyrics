const { Router } = require('express');
const  router = Router();



const { getLyricsChord, createLyricChord, getLyricChord, getLyricChordBySongId, updateLyricChord, deleteLyricChord } = require('../controllers/lyricschord.controllers')

router.get('/bysongid', getLyricChordBySongId);
router.get('/', getLyricsChord);
router.get('/:id', getLyricChord);
router.post('/', createLyricChord);
router.put('/:id', updateLyricChord);
router.delete('/:id', deleteLyricChord);
/*router.get('/search/search', likeSongs);*/


module.exports = router;