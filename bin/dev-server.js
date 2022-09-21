const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const server = http.createServer(function (req, res) {
  // parse URL
  let parsedUrl = url.parse(req.url);

  // extract URL path
  let pathname = path.join(__dirname, '../docs', parsedUrl.pathname);
  // based on the URL path, extract the file extension. e.g. .js, .doc, ...
  const ext = path.parse(pathname).ext;
  // maps file extension to MIME typere
  const map = {
    '.html': 'text/html',
    '.json': 'application/json',
    '.png': 'image/png',
  };

  fs.stat(pathname, function (error, stats) {
    if(error) {
      // if the file is not found, return 404
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }

    // read file from file system
    fs.readFile(pathname, function(err, data){
      if(err){
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', map[ext] || 'text/plain' );
        res.end(data);
      }
    });
  });
})

module.exports = server;
