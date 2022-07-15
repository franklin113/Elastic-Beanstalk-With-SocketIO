var port = process.env.PORT || 3000,
    fs = require('fs'),
    html = fs.readFileSync('index.html');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    console.log('A user connected');
    socket.emit('hi', { message: 'Welcome to the chat' });
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});
http.listen(port, function() {
   console.log('listening on *:'+port);
});