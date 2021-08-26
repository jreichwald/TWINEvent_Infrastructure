// connect to the WebSocket

const WebSocket = require('ws');
var socket = new WebSocket('ws://ditto:ditto@twinserver.kve.hs-mannheim.de:38443/ws/2');

socket.onmessage = function(message) {
    console.log('received message data: ' +  message.data);
};
socket.onopen = function() {
    // register for receiving messages
    socket.send('START-SEND-MESSAGES');
};

