const { Router } = require('express');
const  router = Router();



const { getCategories, createCategory, getCategory, updateSong, deleteSong, likeSongs } = require('../controllers/category.controllers')

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', createCategory);
/*router.get('/search/search', likeSongs);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);*/

module.exports = router;