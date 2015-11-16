var express = require('express')
var app = express();
var port = process.env.PORT || 3000;

var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');

// Middleware
app.use(morgan('dev'));

app.set('view engine', 'ejs');

// Routes
require('./app/routes.js')(app);

app.listen(port);
console.log('Server is up at: ' + port);
