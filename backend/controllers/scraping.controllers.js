
const {PythonShell} =require('python-shell');

const scrapingWithUrl = async (req, res) => {
    const url = req.query.url;

    console.log(url);
/*
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', ['./scripts/python/run.py', url]);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend)
    });*/
    const path = 'C:/website-apiServer-Lyrics/'
    let options = {
        mode: 'text',
   //     pythonPath: './backend/public/python',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './scripts/python/', //If you are having python_test.py script in same folder, then it's optional.
        args: [url] //An argument which can be accessed in the script using sys.argv[1]
    };


    PythonShell.run('run.py', options, function (err, result){
        if (err) throw err;
        // result is an array consisting of messages collected
        //during execution of script.
        console.log('result***: ', result.toString());
        res.send(result.toString())
    });





};



module.exports = {
    scrapingWithUrl
}