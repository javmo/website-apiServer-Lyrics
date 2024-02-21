const { PythonShell } = require('python-shell');
const Recomendation = require('../models/Recomendation'); // Asegúrate de ajustar la ruta a tu modelo

const createRecomendation = async (req, res) => {
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './scripts/python/', // Ajusta según la ubicación de tu script
        args: [req.body.url] // Asegúrate de enviar 'url' correctamente desde el cliente
    };

    PythonShell.run('stopwords_canciones.py', options, async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al ejecutar el script de Python' });
        }

        try {
            const resJson = JSON.parse(result[0]);
            // Borrar todas las recomendaciones existentes
            await Recomendation.deleteMany({});

            // Guardar las nuevas recomendaciones
            const promises = Object.entries(resJson).map(([lectura, recomendaciones]) => {
                if (recomendaciones.length > 0) {
                    const newRecomendation = new Recomendation({
                        lectura,
                        detalles: recomendaciones
                    });
                    return newRecomendation.save();
                }
            });

            // Espera a que todas las promesas se resuelvan
            await Promise.all(promises);

            res.json({ message: 'Recomendaciones creadas exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al procesar los resultados del script' });
        }
    });
};
// Función para obtener las recomendaciones
const getRecomendations = async (req, res) => {
    try {
        // Buscar todas las recomendaciones en la base de datos
        const recomendations = await Recomendation.find().populate('lyric'); // Asume que quieres poblar el campo 'lyric' para obtener detalles relacionados, ajusta según sea necesario

        // Devolver las recomendaciones como respuesta
        res.json(recomendations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las recomendaciones' });
    }
};

module.exports = {
    createRecomendation,
    getRecomendations // Exportar la nueva función
};
