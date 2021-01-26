const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../util/util');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    // Entrar al chat general
    client.on('entrarChat', (data, callback) => {

        console.log(data);
        
        if( !data.nombre || !data.sala ) {
            return callback({
                error: true,
                mensaje: 'El nombre y sala son necesario',
            });
        }

        client.join(data.sala)

        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.emit('listaPersonas', usuarios.obtenerPersonas());

        callback( personas );

    });

    // Mensaje global
    client.on('enviarMensaje', (data, callback) => {

        let persona = usuarios.obtenerPersona(client.id);

        let mensaje = crearMensaje( persona.nombre, data.mensaje );
        client.broadcast.emit('crearMensaje', mensaje)

    });

    // Desconectar de la página
    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.emit('crearMensaje', 
            crearMensaje('Administrador', `${personaBorrada.nombre} salió`));
        client.broadcast.emit('listaPersonas', usuarios.obtenerPersonas());

    });

    // Mensajes privados
    client.on('mensajePrivado', data => {

        let persona = usuarios.obtenerPersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    });

});