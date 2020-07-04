const router = require('express').Router();

module.exports = (connection) => {
    
    router.get('/', (req, res) => {
        res.render('notes');
    });
    
    router.get('/cp', (req, res) => {
        res.render('notes_cp');
    });

    return router;
};