var socket = io()

function changeVolume(index){
    let element = document.getElementById('input' + index)
    let volume = element.value
    if(volume < 0 || volume > 10) {
        document.getElementById('input' + index).value = 10
    } else {
        socket.emit('change volume', {'index': index, 'volume': volume})
    }
}

socket.on('new volume', (info) => {
    console.log('volume changed to ' + info.volume)
    console.log(info.index)
    let element = document.getElementById('volume' + info.index)
    element.textContent = 'volume : ' + info.volume
})
