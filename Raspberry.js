module.exports = class Raspberry {
  constructor(socket, name) {
    this.socket = socket
    this.name = name
    this.volume = 5
    this.soundFilePath = ""
  }

  // Change the volume to the given state
  // param : volume (int 1-10)
  setVolume(volume) {
    // Check if the given volume is valid
    if(volume < 0 || volume > 10) {
      console.log('invalide volume for : ' + this.name)
      return false
    } else {
      this.volume = volume
      console.log('RPI: changed volume')
      //this.socket.broadcast('new volume', {'volume': this.volume, 'index': this.socket.index})
      return true
    }
  }

  SendConfig() {
      socket.emit('new config', {"name": this.name, "volume": this.volume, "soundFilePath": this.soundFilePath})
      console.log('config send')
  }
}
