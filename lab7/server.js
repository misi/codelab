'use strict';
const https = require('https');
const fs = require('fs');

const options = {
	  key: fs.readFileSync('privkey.pem'),
	  cert: fs.readFileSync('cert.pem')
};
const httpsServer = https.createServer(options);
httpsServer.listen(8080);

const io = require('socket.io')(httpsServer);
io.on('connection', function(socket) {
  socket.on('room', (room) => {
    console.log("Room: "+room);
    socket.join(room);
  });
  socket.on('message', (msg) => {
    console.log("Message: "+msg);
    socket.broadcast.emit('message', msg);
  });
});
