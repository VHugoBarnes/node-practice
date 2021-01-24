var socket = io();

        socket.on('connect', function(){
            console.log('Conectado al server');
        });

        // Escuchar información
        // Esto es para cuando se pierde conexión del server
        socket.on('disconnect', function(){
            console.log('Perdimos conexión con el servidor');
        });

        // Enviar información
        socket.emit('enviarMensaje', {
            usuario: 'Víctor',
            mensaje: 'Hola mundo'
        }, function(resp){
            console.log(resp);
        });

        // Escuchar información
        socket.on('enviarMensaje', function(data){
            console.log(data);
        });