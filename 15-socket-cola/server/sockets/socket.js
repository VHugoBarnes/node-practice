const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    // Escuchar el cliente, generar siguienteTicket
    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguienteTicket();
        console.log(siguiente);
        callback(siguiente);

    });

    // Emitir evento 'estadoActual'
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket()
    });

});