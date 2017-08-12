const express = require('express')
const app = express()
const path = require('path')
const apiController = require('./controllers/api')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

dotenv.load({ path: '.env' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('home', { data: { host: process.env.HOST, user: process.env.USERID, pwd: process.env.PASS, }});
});
app.post('/', apiController.postLogin);
app.get('/api', apiController.getvApi);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})