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

            // Guardar las nuevas recomendaciones con la fecha actual
            const fechaActual = new Date();
            const promises = Object.entries(resJson).map(([lectura, recomendaciones]) => {
                if (recomendaciones.length > 0) {
                    const newRecomendation = new Recomendation({
                        fecha: fechaActual,
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

// Función para obtener la recomendación más reciente
const getRecomendations = async (req, res) => {
    try {
        // Buscar la recomendación más reciente en la base de datos
        const latestRecomendation = await Recomendation.findOne().sort('-created_at').populate('lyric'); // Asume que quieres poblar el campo 'lyric' para obtener detalles relacionados, ajusta según sea necesario

        // Si no se encuentra una recomendación, devolver un mensaje adecuado
        if (!latestRecomendation) {
            return res.status(404).json({ message: 'No se encontraron recomendaciones' });
        }

        // Devolver la recomendación más reciente como respuesta
        res.json(latestRecomendation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la recomendación más reciente' });
    }
};


module.exports = {
    createRecomendation,
    getRecomendations // Exportar la nueva función
};
