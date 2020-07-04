/**
 * Import modules
 */
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 12345;
const aceLangsAndThemesPath = path.join(__dirname + '/public/ace-builds-master/src-noconflict');


/**
 * Create objects
 */
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


/**
 * Database
 */
// TODO

/**
 * Routes
 */
app.use('/', require('./routes/home')(__dirname, aceLangsAndThemesPath));
app.use('/killtheloop', require('./routes/killProcess')());
// app.use('/notes', require('./routes/notes')(connection)); // TODO


/**
 * Listen
 */
app.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`);
});