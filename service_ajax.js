'use strict';

// REQEUST curl --unix-socket /tmp/nodejs_dog.sock http://yandex.ru/test.php

const SOCKETFILE = '/tmp/nodejs_service_ajax_'+Date.now()+'.sock';
const http = require('http');


// process.on('message', (msg) => {
process.on('message', ({ name, msg }) => {
  if (name === 'start') {
    start();
  }
});


function start() {
  http.createServer((req, res) => {
    console.log('service ajax req.url=', req.url);
    // res.writeHead(200, { 'Content-Type': 'application/javascript' });
    res.end(JSON.stringify({ test: 123 }));
  }).listen(SOCKETFILE);
  process.send({ name: 'started', socket_file: SOCKETFILE });
}

