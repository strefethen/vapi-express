const express = require('express')
const app = express()
const apiController = require('./controllers/api')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

dotenv.load({ path: '.env' });

// NOTE: As this is a demo we're referring to files in node_modules which is not something for production purposes.
app.use('/clarity-ui', express.static(__dirname + '/node_modules/clarity-ui/'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'pug');

// NOTE: The HOST, USERID, PASS are defaulted from .env which is done to help expedite login for a demo
app.get('/', function (req, res) {
  res.render('home', { data: { title: process.env.TITLE, host: process.env.HOST, user: process.env.USERID, pwd: process.env.PASS, }});
});
app.post('/', apiController.postLogin);
app.get('/inventory', apiController.getvSphereApi);
app.get('/logout', function (req, res) {
  res.clearCookie('api-session');
  res.clearCookie('host');
  res.redirect('/');
});

app.listen(3000, function () {
  console.log('vSphere REST example webapp listening on port 3000!')
})