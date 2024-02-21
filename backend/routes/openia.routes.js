const { Router } = require('express');
const  router = Router();



const { createRecomendation, getRecomendations } = require('../controllers/openia.controllers')

router.post('/', createRecomendation);
router.get('/', getRecomendations);
/*router.get('/:id', getSong);
router.post('/', createSong);
router.get('/search/search', likeSongs);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);*/

module.exports = router;