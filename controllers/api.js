exports.postLogin = function(req, res, next) {
  request = require('request');

  let username = req.body.user;
  let password = req.body.password;
  let auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

  request(
      {
          url : process.env.HOST + process.env.LOGIN_PATH,
          method: 'POST',
          strictSSL: false,
          jar: true,
          headers : {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Authorization" : auth
          }
      },
      function (error, response, body) {
        res.redirect('/api');
      }
  );
}

exports.getvApi = function(req, res, next) {
  request = require('request');

  var path = '/vcenter/host';

  if (Object.keys(req.query).length > 0) {
    path = req.query.path;
  }

  request(
      {
          url : process.env.HOST + process.env.API_PATH + path,
          method: 'GET',
          strictSSL: false,
          jar: true,
          headers : {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
      },
      function (error, response, body) {
          if (response.statusCode == 401) {
            res.redirect('/');
            return;
          }
          var data = JSON.parse(body);
          var template = 'api';
          if (data.value && data.value.constructor != Array) {
            template = 'apidict';
          }
          title = path.substring(1, path.length);
          title = title.substring(title.indexOf('/') + 1, title.length);
          res.render(template, {
            title: title,
            path: path,
            data: data.value
          });
        }
  );
}
