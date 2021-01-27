const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../util/util');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    // Entrar al chat general
    client.on('entrarChat', (data, callback) => {
        
        if( !data.nombre || !data.sala ) {
            return callback({
                error: true,
                mensaje: 'El nombre y sala son necesario',
            });
        }

        client.join(data.sala)

        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala)
        .emit('listaPersonas', usuarios.obtenerPersonasPorSala(data.sala));

        callback( usuarios.obtenerPersonasPorSala(data.sala) );

    });

    // Mensaje global
    client.on('crearMensaje', (data, callback) => {

        let persona = usuarios.obtenerPersona(client.id);

        let mensaje = crearMensaje( persona.nombre, data.mensaje );
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

        callback(mensaje);

    });

    // Desconectar de la página
    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala)
        .emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`));

        client.broadcast.to(personaBorrada.sala)
        .emit('listaPersonas', usuarios.obtenerPersonasPorSala(personaBorrada.sala));

    });

    // Mensajes privados
    client.on('mensajePrivado', data => {

        let persona = usuarios.obtenerPersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    });

});