const { Router } = require('express');
const  router = Router();

const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const { extractText } = require('../controllers/scaner.controller');


router.post('/scan', upload.single('image'), extractText);

/*router.get('/:id', getSong);
router.post('/', createSong);
router.get('/search/search', likeSongs);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);*/

module.exports = router;
