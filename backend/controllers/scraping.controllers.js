
const {PythonShell} =require('python-shell');
const axios = require('axios');
const he = require('he');

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
    const { fecha } = req.query; // Recibe la fecha desde la query string (YYYY-MM-DD)

    if (!fecha) {
        return res.status(400).json({ error: "La fecha es requerida en formato YYYY-MM-DD" });
    }

    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // Para capturar la salida en tiempo real
        scriptPath: './scripts/python/',
        args: [fecha] // Pasamos la fecha como argumento al script de Python
    };

    PythonShell.run('scraping_lectura_va.py', options, function (err, result) {
        if (err) {
            console.error("Error en Python:", err);
            return res.status(500).send('Error al ejecutar el script de Python');
        }

        // Unir la salida del script en un solo string y limpiarlo
        const resultString = result.join('').trim();
       // console.log('Resultado del script de Python:', resultString);  // Verificar la salida cruda

        try {
            const resJson = JSON.parse(resultString);
           // console.log('Resultado JSON:', resJson);  // Verificar el resultado JSON

            // Asegurarse de que la respuesta se devuelve en UTF-8
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.json(resJson);
        } catch (error) {
            console.error('Error al parsear JSON:', error, '\nSalida:', resultString);
            return res.status(500).json({ error: 'Error al procesar los resultados del script de Python', details: error.message });
        }
    });
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



module.exports = {
    scrapingWithUrl,
    createScrapSong,
    scrapingLectura,
    scrapingLecturaVa,
    scrapingSantos,
    obtenerFiestasDelMes
}