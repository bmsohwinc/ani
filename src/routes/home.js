const router = require('express').Router();
const fs = require('fs');
const exec = require('child_process').exec;
const {performance} = require('perf_hooks')

function init_promise(langType) {

    return new Promise(function(resolve, reject) {
        // run the script here...
        console.log("[I] Executing the script...");

        let runnerCommand;
        switch (langType) {
            case 'c_cpp':
                runnerCommand = 'bash ./process/cpp_runner.sh';
                break;

            case 'java':
                runnerCommand = 'bash ./process/java_runner.sh';
                break;

            case 'python':
                runnerCommand = 'bash ./process/py_runner.sh';
                break;
        
            default:
                break;
        }

        exec(runnerCommand, function(err, stdout, stderr) {            
            if (err || stderr) {
                console.log(stderr);                
                reject(stderr);
            }
            else {
                resolve("[I] Script ran successfully");
            }
        })
    });
}

module.exports = (srcPath, acePath) => {
    router.get('/', (req, res) => {

        // get all the theme files and extract amd export the names
        /**
         * Refer : 
         *  https://medium.com/stackfame/get-list-of-all-files-in-a-directory-in-node-js-befd31677ec5
         */
        fs.readdir(acePath, (err, files) => {            
            files = files.filter(file => file.startsWith('theme'));
            files = files.map(file => file.slice(6, -3));
            res.render('home', {themes : files});
        });
    });

    router.post('/', (req, res) => {
        // write the input and code to files
        // execute the files
        // reply with the output
        const theCode = req.body.theCode;
        const input = req.body.input;
        const langType = req.body.lang;

        console.log('req.body is : ', req.body);

        fs.writeFileSync(srcPath + '/process/input.txt', input);
        let codeFilePath = srcPath + '/process/';
        let codeFilePath_2 = srcPath + '/public/codes/';
        switch (langType) {
            case 'c_cpp':
                codeFilePath += 'cpp_code.cpp';
                codeFilePath_2 += 'cpp_code.cpp';
                break;
            case 'java':
                codeFilePath += 'java_code.java';
                codeFilePath_2 += 'java_code.java';
                break;
            case 'python':
                codeFilePath += 'python_code.py';
                codeFilePath_2 += 'python_code.py';
                break;
            default:
                break;
        }

        console.log('codeFilePath : ', codeFilePath);
        console.log('codeFilePath_2 : ', codeFilePath_2);
        
        // needed for execution
        fs.writeFileSync(codeFilePath, theCode);
        // needed as cache file in case langs are switched.
        fs.writeFileSync(codeFilePath_2, theCode);

        const tic = performance.now();
        let initPromise = init_promise(langType);
        initPromise.then(result => {
            console.log(result);
            res.sendFile(srcPath + '/process/output.txt');
        }, function(err) {
            res.send('<b style="color:red;">' + err + '</b>');
        });
        const toc = performance.now();

        console.log(`[ I ] Took ${toc - tic} millisec for exec...\n`);
    });
    
    return router;
};