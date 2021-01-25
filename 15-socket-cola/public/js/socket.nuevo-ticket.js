// Comando para establecer la conexión
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// escuchar
socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

$('button').on('click', function(){
    socket.emit('siguienteTicket', null, function(siguienteTicket){
        label.text(siguienteTicket);
    });
});
