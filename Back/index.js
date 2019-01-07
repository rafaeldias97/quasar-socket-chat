const express = require('express')

const app = express()

const server = app.listen(3001, function () {
  console.log('server running on port 3001');
})

const io = require('socket.io')(server)
var nsp = io.of('/ROOM');

nsp.on('connection', function (socket) {
  // console.log(socket.nsp.name)
  socket.on('GENERATE_ID', function (data) {
    nsp.emit('MESSAGE_id', { id: socket.id, data: data})
  })
  socket.on('SEND_MESSAGE', function (data) {
    nsp.emit('MESSAGE', data)
  })
  socket.on('DESTROY_ID', function (data) {
    nsp.emit('MESSAGE_DESTROY', {data: data})
  })
  socket.on('SEND_LINK', function (data) {
    nsp.emit('VIDEO_LINK', data)
  })
})
