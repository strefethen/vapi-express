const express = require('express')
const app = express()
const apiController = require('./controllers/api')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const syncRequest = require('sync-request')
const request = require('sync-request')

dotenv.load({ path: '.env' });

// NOTE: As this is a demo we're referring to files in node_modules which is not something for production purposes.
app.use('/clarity-ui', express.static(__dirname + '/node_modules/clarity-ui/'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'pug');

// Login page (home page)
app.get('/', (req, res) => {
  console.log('Rendering login');
  var response = syncRequest('GET', 'http://10.132.99.217:8080/peek');
  var body = JSON.parse(response.getBody('utf8'));
  let host = '10.132.97.51';
  try {
    host = body.layer1[0].vc[0].systemPNID;
    res.render('home', { redirect: req.query.redirect, title: process.env.TITLE, host: `https://${host}`, user: process.env.USERID, pwd: process.env.PASS, hosts: ["https://10.132.97.51"] });
} catch(err) {
    res.render('home', { redirect: req.query.redirect, title: process.env.TITLE, host: `https://${host}`, user: process.env.USERID, pwd: process.env.PASS, hosts: ["https://10.132.97.51"] });
  }
});

// Handle POST request for login
app.post('/', apiController.postLogin);

// Handle vSphere REST API requests
app.get('/inventory', apiController.getApi);

// Handle logout, close API session and clear client cookies
app.get('/logout', apiController.getLogout);

app.listen(3000, function () {
  console.log('vSphere REST example webapp listening on port 3000!')
})