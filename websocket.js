const express = require('express');
const http = require('http');
const path = require('path');
const WebSocketServer = require('ws').Server;


let app = express();
let server = http.Server(app);
let wss = new WebSocketServer({ server: server, path: '/ws', clientTracking: true });

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'websocket.html'));
});

wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    console.log('Received: ', message);
    ws.send('I heard: ' + message);
  });
});

function broadcast(message) {
  for (let ws of wss.clients) {
    ws.send(message);
  }
}
let counter = 0;

setInterval(function() {
  counter++;
  broadcast(counter);
}, 1000);




server.listen(3000);

