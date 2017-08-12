const express = require('express')
const app = express()
const path = require('path')
const apiController = require('./controllers/api')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

dotenv.load({ path: '.env' });

// HACK: This is a hack and not something that would/should be done in normal practice
// HACK: These files should be hosted elsewhere for a "real" website
app.use('/clarity-ui', express.static(__dirname + '/node_modules/clarity-ui/'));
app.use('/clarity-icons', express.static(__dirname + '/node_modules/clarity-icons/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'pug');

// HACK: The HOST, USERID, PASS are defaulted from .env which is done to help expedite login for a demo
app.get('/', function (req, res) {
  res.render('home', { data: { title: process.env.TITLE, host: process.env.HOST, user: process.env.USERID, pwd: process.env.PASS, }});
});
app.post('/', apiController.postLogin);
app.get('/api', apiController.getvApi);


app.listen(3000, function () {
  console.log('vAPI REST example app listening on port 3000!')
})