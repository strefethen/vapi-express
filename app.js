const express = require('express')
const app = express()
const path = require('path')
const apiController = require('./controllers/api')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

dotenv.load({ path: '.env' });

// HACK: This is a demo hack as referring to files in node_modules is not something for production purposes.
//       These files should be hosted elsewhere for a "real" website.
app.use('/clarity-ui', express.static(__dirname + '/node_modules/clarity-ui/'));
app.use('/clarity-icons', express.static(__dirname + '/node_modules/clarity-icons/'));
app.use(cookieParser());

// Used to parse the login input fields
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'pug');

// HACK: The HOST, USERID, PASS are defaulted from .env which is done to help expedite login for a demo
app.get('/', function (req, res) {
  res.render('home', { data: { title: process.env.TITLE, host: process.env.HOST, user: process.env.USERID, pwd: process.env.PASS, }});
});
app.post('/', apiController.postLogin);
app.get('/api', apiController.getvSphereApi);
app.get('/logout', function (req, res) {
  res.clearCookie('api-session');
  res.clearCookie('host');
  res.redirect('/');
});

app.listen(3000, function () {
  console.log('vSphere REST example app listening on port 3000!')
})