// Module imports
const Raspberry = require('./Raspberry')
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
app.use('/css', express.static('css'))

// Routes
app.get('/', (req, res) => {
    res.render('changeConfig', {RPIs})
})

// Socket.io
io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('raspberryPI', (message) => {
        socket.index = RPIs.length;
        RPIs.push(new Raspberry(socket, message.name))
        console.log('The RPI "' + message.name + '" is connected')

        socket.on('disconnect', () => {
            console.log(RPIs[socket.index].name + ' diconnected')
            deleteRPI(socket.index)
        })
    })

  socket.on('change volume', (info) => {
      if(RPIs[info.index].setVolume(info.volume)) {
          io.emit('new volume', info)
          RPIs[info.index].socket.emit('set volume', {'volume': info.volume})
      }
  })
})


// Start up the server
http.listen(config.port, () => {
    console.log('Listening on port : ' + config.port)
})

// Functions

// Delete the given index in the RPI array
function deleteRPI(index){
    RPIs.splice(index, 1)
    for(let y = index; y < RPIs.length; y++) {
        RPIs[y].socket.index--
    }
}
