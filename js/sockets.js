var socket = io()

function changeVolume(index, volume){
    console.log('Volume changed to ' + volume + ' on index ' + index)
    socket.emit('change volume', {'index': index, 'volume': volume})
}

socket.on('new volume', (info) => {
    console.log('volume changed to ' + info.volume)
    console.log(info.index)
    let element = document.getElementById('volume' + info.index)
    element.textContent = 'volume : ' + info.volume
})
