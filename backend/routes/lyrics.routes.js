const { Router } = require('express');
const  router = Router();


const { getLyrics, createLyric, getLyric, updateLyric, deleteLyric } = require('../controllers/lyrics.controllers')

router.get('/', getLyrics);
router.get('/:id', getLyric);
router.post('/', createLyric);
router.put('/:id', updateLyric);
router.delete('/:id', deleteLyric);


module.exports = router;