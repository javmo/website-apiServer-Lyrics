const { Router } = require('express');
const  router = Router();



const { getCategories, createCategory, getCategory, updateCategory, deleteCategory, likeSongs } = require('../controllers/category.controllers')

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

/*router.get('/search/search', likeSongs);
router.put('/:id', updateCategory);
router.delete('/:id', deleteSong);*/

module.exports = router;