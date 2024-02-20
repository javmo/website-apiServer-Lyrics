const { Router } = require('express');
const  router = Router();



const { scrapingWithUrl, createScrapSong, scrapingLectura } = require('../controllers/scraping.controllers')

router.get('/search', scrapingWithUrl);
router.get('/lectura', scrapingLectura);
router.post('/', createScrapSong);
/*router.get('/:id', getSong);
router.post('/', createSong);
router.get('/search/search', likeSongs);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);*/

module.exports = router;