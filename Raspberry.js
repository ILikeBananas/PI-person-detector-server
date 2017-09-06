module.exports = class Raspberry {
  constructor(socket, name) {
    this.socket = socket
    this.name = name
    this.volume = 5
    this.soundFilePath = ""
  }

  test(TestMessage) {
    socket.emit("test", TestMessage)
  }

  // Change the volume to the given state
  // param : volume (int 1-10)
  setVolume(volume) {
    // Check if the given volume is valid
    if(volume < 0 || volume > 10) {
      console.log('invalide volume for : ' + this.name)
      return
    }
    this.volume = volume
    console.log('RPI: changed volume')
    this.socket.emit('new volume', {'volume': this.volume, 'index': this.socket.index})
  }
}
