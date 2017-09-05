// Module imports
import * from './Raspberry.js'
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const config = require('./config.json')

// Array of all raspberrys
let RPIs = []

// Include classes

// Setting up Pug
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

// Static routes
app.use('/js', express.static('js'))

// Routes
app.get('/', (req, res) => {
  res.render('changeConfig')
})

// Socket.io
io.on('connection', (socket) => {
  console.log('user connected')
  socket.on('raspberryPI', (message) => {
    socket.index = RPIs.length;
    RPIs.push(new Raspberry(socket, message.name))
    console.log('The RPI "' + message.name + '" is connected')
    socket.on('disconnect', () => {
      console.log(RPIs[socke.index].name)
    })
  })
})


// Start up the server
http.listen(config.port, () => {
  console.log('Listening on port : ' + config.port)
})
