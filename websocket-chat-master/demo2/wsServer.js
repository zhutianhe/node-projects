var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var PORT = 3000;
var clientCount = 0;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  clientCount ++;
  socket.nickname = 'user' + clientCount;
  io.emit('enter', socket.nickname + ' comes in');

  socket.on('message', function(str) {
    io.emit('message', socket.nickname + 'says: ' + str);
  })

  socket.on('disconnect', function() {
    io.emit('leave', socket.nickname + ' left');
  })
});

http.listen(PORT, function() {
  console.log('listening on *:' + PORT);
});