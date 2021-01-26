// Comando para establecer conexión
var socket = io();
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

// escuchar
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// escuchar
socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', function(data){
    data.ultimosCuatro.forEach((element, index) => {
        $(`#lblTicket${index+1}`).text("Ticket " + element.numero);
        $(`#lblEscritorio${index+1}`).text("Escritorio " + element.escritorio);
    }); 
});
