const { Router } = require('express');
const router = Router();

// Importamos las funciones del controlador
const { getAllChords, getChordBySongId, searchChordsByTitle } = require('../controllers/chords.controllers');

// Ruta para obtener todos los acordes
router.get('/', getAllChords);

// Ruta para obtener un acorde por songId
router.get('/bySongId/:songId', getChordBySongId);

// Ruta para buscar acordes por título (búsqueda tipo 'like')
router.get('/search/byTitle', searchChordsByTitle);

module.exports = router;
