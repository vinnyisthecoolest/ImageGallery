var User = require('./models/user');

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.get('/login', function(req, res) {
    res.render('login.ejs', {message: req.flash('loginMessage')});
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/homepage',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.get('/signup', function(req, res) {
    res.render('signup.ejs', {message: req.flash('signupMessage')});
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/homepage', isLoggedIn, function(req, res) {
    res.render('homepage.ejs', {user: req.user});
  });

  app.get('/upload', isLoggedIn, function(req, res) {
    res.render('upload.ejs', {message: req.flash('uploadMessage')});
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login');
}
