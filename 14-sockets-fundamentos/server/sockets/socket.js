const { io } = require('../server');

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido'
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar al cliente
    client.on('enviarMensaje', (data, callback) => {
        console.log(data);

        client.broadcast.emit('enviarMensaje', { data });

        // if(mensaje.nombre) {
        //     callback({
        //         res: 'Todo salió bien'
        //     });
        // } else {
        //     callback({
        //         res: 'Todo salió bien'
        //     });
        // }
    });

});