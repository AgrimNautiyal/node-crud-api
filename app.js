var request = require('request');
var express  = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', require('./routes/index'));
app.listen(8000);
