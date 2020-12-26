const { Router } = require('express');
const  router = Router();


const { getGenres, createGenre, getGenre, updateLyric, deleteLyric } = require('../controllers/genres.controllers')

router.get('/', getGenres);
router.post('/', createGenre);
router.get('/:id', getGenre);
/*router.post('/', createLyric);
router.put('/:id', updateLyric);
router.delete('/:id', deleteLyric);*/

module.exports = router;