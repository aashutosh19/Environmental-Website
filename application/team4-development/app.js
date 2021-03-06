
//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
hbs.registerHelper("equal", require("handlebars-helper-equal"));
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();

//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set public folder as static folder for static file
app.use('/assets',express.static(__dirname + '/public'));
app.use(express.static('./views'));
app.use(express.static('public'));


// app.get('/',(req, res) => {
//       res.render('Test');
//   });


//create connection to get issue
const getIssue = require('./routes/getIssue.js');
app.use(getIssue);

//create connection to main
const main = require('./routes/main.js');
app.use(main);

app.listen(80, () => {
    console.log("Server is up and listening on 80...")
})
