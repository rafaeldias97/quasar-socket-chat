const express = require('express')

const app = express()

const server = app.listen(3001, function () {
  console.log('server running on port 3001');
})

const io = require('socket.io')(server)

io.on('connection', function (socket) {
  console.log(socket.id)
  socket.on('GENERATE_ID', function (data) {
    io.emit('MESSAGE_id', { id: socket.id, data: data})
  })
  socket.on('SEND_MESSAGE', function (data) {
    io.emit('MESSAGE', data)
  })
  socket.on('DESTROY_ID', function (data) {
    io.emit('MESSAGE_DESTROY', {data: data})
  })
  socket.on('SEND_LINK', function (data) {
    io.emit('VIDEO_LINK', data)
  })
})
