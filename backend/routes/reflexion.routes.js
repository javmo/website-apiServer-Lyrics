const { Router } = require("express");
const router = Router();
const {
    getReflexiones,
    getReflexionById,
    createReflexion,
    likeReflexion,
    inspirarReflexion,
    deleteReflexion
} = require("../controllers/reflexion.controllers");

// Rutas para reflexiones
router.get("/", getReflexiones); // Obtener reflexiones por fecha
router.get("/:id", getReflexionById); // Obtener una reflexión por ID
router.post("/", createReflexion); // Crear una reflexión
router.post("/:id/like", likeReflexion); // Dar like a una reflexión
router.post("/:id/inspirar", inspirarReflexion); // Marcar reflexión como inspiradora
router.delete("/:id", deleteReflexion); // Eliminar reflexión

module.exports = router;
