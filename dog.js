'use strict';

// REQEUST curl 127.0.0.1:2000/

const http = require('http');
const request = require('request');
const child_process = require('child_process');

var service_ajax_socket_file;
var service_ajax = child_process.fork('service_ajax.js');
service_ajax.on('message', function(msg) {
  var { name, socket_file } = msg;
  service_ajax_socket_file = socket_file;
  if (name === 'started') {
    console.log('service_ajax up!');
  }
});
service_ajax.send({ name: 'start' });


http.createServer((req, reply) => {
  if (req.url === '/aj') {
    console.log('socket_file=', service_ajax_socket_file);
    const options = {
      socketPath: service_ajax_socket_file,
      path: req.url,
    };

    http.request(options, res => {
      console.log(`STATUS: ${res.statusCode}`);
      res.setEncoding('utf8');
      res.on('data', data => {
        console.log(data);
        reply.end(data);
      });
      res.on('error', data => console.error(data));
    }).end();

  }
  console.log('req.url=', req.url);
}).listen(2000);
