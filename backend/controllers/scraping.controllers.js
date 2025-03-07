
const {PythonShell} =require('python-shell');
const axios = require('axios');
const he = require('he');
const Lectura = require("../models/Lectura");
const Reflexion = require("../models/Reflexion");

const scrapingWithUrl = async (req, res) => {
    const url = req.query.url;

    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './scripts/python/', //If you are having python_test.py script in same folder, then it's optional.
        args: [url] //An argument which can be accessed in the script using sys.argv[1]
    };

    PythonShell.run('scraping_preview.py', options, function (err, result){
        if (err) throw err;
        // result is an array consisting of messages collected
        //during execution of script.
        var resJson = JSON.parse(result[0])

        res.json(resJson)
    });

};

const scrapingLectura = async (req, res) => {

    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './scripts/python/', //If you are having python_test.py script in same folder, then it's optional.
    };

    PythonShell.run('scraping_lectura.py', options, function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al ejecutar el script de Python');
        }
        
        // Concatena todos los elementos del array para formar el JSON completo
        const resultString = result.join('');
        try {
            const resJson = JSON.parse(resultString);
            res.json(resJson);
        } catch (error) {
            console.error('Error parsing result from Python script', error);
            res.status(500).send('Error al procesar los resultados del script de Python');
        }
    });
};


const createScrapSong = async (req, res) => {
    const url = req.body.url;

    console.log(url);
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './scripts/python/', //If you are having python_test.py script in same folder, then it's optional.
        args: [url] //An argument which can be accessed in the script using sys.argv[1]
    };

    PythonShell.run('run.py', options, function (err, result){
        if (err) throw err;
        // result is an array consisting of messages collected
        //during execution of script.
        console.log('API-log: ', result);

        res.json('Python-log: ' + result)
    });

};


const scrapingLecturaVa = async (req, res) => {
    const { fecha } = req.body; // Recibe la fecha desde el body en formato YYYY-MM-DD

    if (!fecha) {
        return res.status(400).json({ error: "La fecha es requerida en formato YYYY-MM-DD" });
    }

    try {
        // Verificar si la lectura ya está en la base de datos
        const lecturaExistente = await Lectura.findOne({ fecha });
        if (lecturaExistente) {
            return res.status(409).json({ error: "La lectura ya existe en la base de datos." });
        }

        // Opciones para ejecutar el script de Python
        let options = {
            mode: "text",
            pythonOptions: ["-u"], // Para capturar salida en tiempo real
            scriptPath: "./scripts/python/",
            args: [fecha], // Pasamos la fecha como argumento al script
        };

        // Ejecutar el script de Python
        PythonShell.run("scraping_lectura_va.py", options, async function (err, result) {
            if (err) {
                console.error("❌ Error en Python:", err);
                return res.status(500).json({ error: "Error al ejecutar el script de Python" });
            }

            try {
                // Procesar el resultado del script
                const resultString = result.join("").trim();
                const resJson = JSON.parse(resultString);

                // Crear el objeto para MongoDB
                const nuevaLectura = new Lectura({
                    fecha,
                    primeraLectura: resJson["Primera lectura"] || "No disponible",
                    segundaLectura: resJson["Segunda lectura"] || "No disponible",
                    evangelio: resJson["Evangelio"] || "No disponible",
                    angelus: resJson["Ángelus"] || "No disponible",
                });

                // Guardar en MongoDB
                await nuevaLectura.save();
                console.log(`✅ Lectura para ${fecha} guardada en MongoDB`);

                res.status(201).json(nuevaLectura);
            } catch (error) {
                console.error("❌ Error al parsear JSON:", error);
                return res.status(500).json({ error: "Error al procesar los resultados del script de Python" });
            }
        });
    } catch (error) {
        console.error("❌ Error en el servidor:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};



const getLecturaPorFecha = async (req, res) => {
    const { fecha } = req.query; // Recibe la fecha desde query params (YYYY-MM-DD)

    if (!fecha) {
        return res.status(400).json({ error: "La fecha es requerida en formato YYYY-MM-DD" });
    }

    try {
        // Buscar la lectura en la base de datos
        const lectura = await Lectura.findOne({ fecha });

        if (!lectura) {
            return res.status(404).json({ error: `No se encontró la lectura para la fecha ${fecha}` });
        }

        console.log(`📖 Lectura para ${fecha} recuperada de MongoDB`);
        res.status(200).json(lectura);
    } catch (error) {
        console.error("❌ Error al consultar la lectura en MongoDB:", error);
        res.status(500).json({ error: "Error interno del servidor", details: error.message });
    }
};

const scrapingSantos = async (req, res) => {
    const { fecha } = req.query; // Recibe la fecha desde la query string (YYYY-MM-DD)

    if (!fecha) {
        return res.status(400).json({ error: "La fecha es requerida en formato YYYY-MM-DD" });
    }

    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // Para capturar la salida en tiempo real
        scriptPath: './scripts/python/', // Directorio donde está el script Python
        args: [fecha] // Pasamos la fecha tal como la recibimos (YYYY-MM-DD)
    };

    // Ejecutar el script Python para obtener los santos del día
    PythonShell.run('scraping_santos_va.py', options, function (err, result) {
        if (err) {
            console.error("Error en Python:", err);
            return res.status(500).send('Error al ejecutar el script de Python');
        }

        // Unir la salida del script en un solo string y limpiarlo
        const resultString = result.join('').trim();
        const decodedResult = Buffer.from(resultString, 'utf-8').toString();

        try {
            // Parsear el resultado a JSON
            const resJson = JSON.parse(decodedResult);

            // Asegurarse de que la respuesta se devuelve en UTF-8
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.json(resJson);
        } catch (error) {
            console.error('Error al parsear JSON:', error, '\nSalida:', resultString);
            return res.status(500).json({ error: 'Error al procesar los resultados del script de Python', details: error.message });
        }
    });
};

const obtenerFiestasDelMes = async (req, res) => {
    const { fecha } = req.query;  // Recibe la fecha en formato YYYY-MM-DD

    if (!fecha) {
        return res.status(400).json({ error: "El parámetro fecha es requerido en formato YYYY-MM-DD." });
    }

    // Validar formato de fecha
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(fecha)) {
        return res.status(400).json({ error: "La fecha debe estar en formato YYYY-MM-DD." });
    }

    // Extraer el mes de la fecha
    const [anio, mes] = fecha.split("-");

    // Validar el mes
    const mesFormateado = parseInt(mes, 10);
    if (mesFormateado < 1 || mesFormateado > 12) {
        return res.status(400).json({ error: "El mes debe ser un número entre 1 y 12." });
    }

    try {
        // Llamar al endpoint de Vatican News
        const response = await axios.get(`https://www.vaticannews.va/es/fiestas-liturgicas.list.month.${mesFormateado}.l:10.o:0.s:pdd.js`);

        if (response.data && response.data.totalMatches > 0) {
            // Limpiar y formatear los datos
            const fiestas = Object.values(response.data)
                .filter(festa => festa.title) // Filtrar elementos vacíos
                .map(festa => ({
                    nombre: he.decode(festa.title), // Decodificar caracteres HTML
                    fecha: festa.date ? festa.date.split("T")[0] : "Fecha no disponible", // Convertir fecha a YYYY-MM-DD
                    ruta: festa.path,
                    imagen: festa.image ? `https://www.vaticannews.va${festa.image}` : null,
                    imagen_hover_titulo: festa.imageHoverTitle ? he.decode(festa.imageHoverTitle) : null,
                    subtitulo: festa.subTitle ? he.decode(festa.subTitle) : null,
                    texto: festa.text ? he.decode(festa.text) : null,
                    titulo: he.decode(festa.title),
                    activar_tres_anos: festa.activateThreeYears || false
                }));

            return res.json({
                mes: mesFormateado,
                fiestas
            });
        } else {
            return res.status(404).json({ message: "No se encontraron fiestas litúrgicas para este mes." });
        }
    } catch (error) {
        console.error('Error al obtener las fiestas litúrgicas:', error);
        return res.status(500).json({ error: "Error al obtener las fiestas litúrgicas." });
    }
};

const scrapingReflexionArqMadrid = async (req, res) => {
    const { fecha } = req.body; // Recibe la fecha desde el body en formato YYYY-MM-DD

    if (!fecha) {
        return res.status(400).json({ error: "La fecha es requerida en formato YYYY-MM-DD" });
    }

    try {
        // Verificar si la reflexión ya está en la base de datos por fecha y autor
        const reflexionExistente = await Reflexion.findOne({ fecha, nombre: "Archidiócesis de Madrid" });
        if (reflexionExistente) {
            return res.status(409).json({ error: "La reflexión ya existe en la base de datos para esta fecha y autor." });
        }

        // Opciones para ejecutar el script de Python
        let options = {
            mode: "text",
            pythonOptions: ["-u"], // Para capturar salida en tiempo real
            scriptPath: "./scripts/python/", // Directorio donde está el script
            args: [fecha.replace(/-/g, "/")] // Cambia YYYY-MM-DD a YYYY/MM/DD para Python
        };

        // Ejecutar el script de Python
        PythonShell.run("reflexionArqMadrid.py", options, async function (err, result) {
            if (err) {
                console.error("❌ Error en Python:", err);
                return res.status(500).json({ error: "Error al ejecutar el script de Python" });
            }

            try {
                // Convertir la salida del script a JSON
                const resultString = result.join("").trim();
                const resJson = JSON.parse(resultString);

                if (resJson.error) {
                    return res.status(400).json(resJson); // Si hay error en el script, devolverlo
                }

                // Crear el objeto para MongoDB con el autor fijo
                const nuevaReflexion = new Reflexion({
                    fecha,
                    nombre: "Archidiócesis de Madrid",
                    comentario: resJson.comentario
                });

                // Guardar en MongoDB
                await nuevaReflexion.save();
                console.log(`✅ Reflexión para ${fecha} guardada en MongoDB`);

                res.status(201).json(nuevaReflexion);
            } catch (error) {
                console.error("❌ Error al parsear JSON:", error);
                return res.status(500).json({ error: "Error al procesar los resultados del script de Python" });
            }
        });
    } catch (error) {
        console.error("❌ Error en el servidor:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};


module.exports = {
    scrapingWithUrl,
    createScrapSong,
    scrapingLectura,
    scrapingLecturaVa,
    scrapingSantos,
    obtenerFiestasDelMes,
    getLecturaPorFecha,
    scrapingReflexionArqMadrid
}