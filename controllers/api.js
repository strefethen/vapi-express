exports.postLogin = function(req, res, next) {
  request = require('request');

  request(
      {
          url : process.env.HOST + process.env.LOGIN_PATH,
          method: 'POST',
          strictSSL: false,
          jar: true,
          headers : {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Authorization" : "Basic " + new Buffer(req.body.user + ":" + req.body.password).toString("base64")
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

  // if the path was provided as a query param used that value instead
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
          } else {
            res.render('api', {
              path: path,
              data: JSON.parse(body).value
            });
          }
        }
  );
}
