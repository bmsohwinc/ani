const killScript = "kill -9 $(ps aux | grep 'cppo' | grep -v grep | awk '{print $2}');" +
"kill -9 $(ps aux | grep 'python_code.py' | grep -v grep | awk '{print $2}');" + 
"kill -9 $(ps aux | grep 'java_code' | grep -v grep | awk '{print $2}');";

const router = require('express').Router();
const exec = require('child_process').exec;

module.exports = () => {
    router.get('/', (req, res) => {
        console.log("The code probably ran into an infi loop. Killing it...");
        exec(killScript, (err) => {
            const infiLoopMsg = "Code ran into infi loop. Killed It"
            res.send(infiLoopMsg);
        });
    });
    
    return router;
};