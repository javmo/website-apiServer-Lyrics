const { Router } = require('express');
const  router = Router();


const { getLyricsPublish, createLyricPublish, getLyricPublish, updateLyricPublish, deleteLyricPublish, findByCategory,} = require('../controllers/lyricspublish.controllers')

router.get('/', getLyricsPublish);
router.get('/:id', getLyricPublish);
router.get('/search/search', findByCategory);
router.post('/', createLyricPublish);
router.put('/:id', updateLyricPublish);
router.delete('/:id', deleteLyricPublish);


module.exports = router;