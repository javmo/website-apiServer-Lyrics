const { Router } = require("express");
const router = Router();
const {
    getCanciones,
    createCancion,
    deleteCancion
} = require("../controllers/cancion.controllers");

// Rutas para canciones recomendadas
router.get("/", getCanciones); // Obtener canciones por fecha
router.post("/", createCancion); // Crear una nueva canción recomendada
router.delete("/:id", deleteCancion); // Eliminar una canción

module.exports = router;