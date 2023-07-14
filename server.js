const express  = require('express');
const { json, urlencoded }  = require('body-parser');

const routes  = require('./routes');

exports.getServer = function(port) {
  const server = express();
  server.use(json());
  server.use(urlencoded({ extended: true }));

  server.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      if (req.method == 'OPTIONS') {
          res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
          res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, X-Requested-With, ngrok-skip-browser-warning");
          res.sendStatus(200);
      }
      else {
          next();
      }
  });

  server.use('/', routes);
  server.get('/', (req, res) => res.send('up'));

  return server.listen(port, () => console.log("Collectify API started on HTTP port", port));
}
