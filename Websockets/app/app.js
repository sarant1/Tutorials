// use ws to initiate a websocket connection
const socket = io('ws://localhost:8082');

socket.on('message', text => {
    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el)
});


document.querySelector('button').onclick = () => {
    console.log("CLICKED")
    const text = document.querySelector('input').value;
    socket.emit('message', text);
    document.querySelector('input').value = '';
};