const { Router } = require('express');
const  router = Router();



const { getSongs, createSong, getSong, updateSong, deleteSong, likeSongs } = require('../controllers/songs.controllers')

router.get('/', getSongs);
router.get('/:id', getSong);
router.post('/', createSong);
router.get('/search/search', likeSongs);
/*router.put('/:id', updateSong);*/
router.delete('/:id', deleteSong);

module.exports = router;