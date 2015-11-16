var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

// Mongo set up
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport')(passport);

// Middleware
app.use(morgan('dev'));
app.use("/public", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'anystringoftext',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine', 'ejs');

// Routes
require('./app/routes.js')(app, passport);

app.listen(port);
console.log('Server is up at port: ' + port);
