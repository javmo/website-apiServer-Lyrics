
const {PythonShell} =require('python-shell');

const scrapingWithUrl = async (req, res) => {
    const url = req.query.url;

    console.log(url);
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
        console.log('API-log: ', resJson);

        res.json(resJson)
    });

};


module.exports = {
    scrapingWithUrl
}