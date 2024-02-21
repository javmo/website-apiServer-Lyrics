
const {PythonShell} =require('python-shell');

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
            console.log('API-log: ', resJson);
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


module.exports = {
    scrapingWithUrl,
    createScrapSong,
    scrapingLectura
}