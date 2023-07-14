const { join } = require('path');
const { get } = require('http');

const { getServer }  = require(join(__dirname, './server'));

require('dotenv').config();

// Check if port is already in use
const port = process.env.SERVER_PORT || 3615;
var server = null;

var request = get(`http://localhost:${port}/`,(response) => {
  let data = '';
  response.on('data', (chunk) => data += chunk );
  response.on('end', () => console.log(`port ${port} is already in use`) );

}).on("error", (err) => server = getServer(port));

request.end();
