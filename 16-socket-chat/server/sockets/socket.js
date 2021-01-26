const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {
        
        if( !data.nombre ) {
            return callback({
                error: true,
                mensaje: 'El nombre es necesario',
            });
        }

        let personas = usuarios.agregarPersona(client.id, data.nombre);

        client.broadcast.emit('listaPersonas', usuarios.obtenerPersonas());

        callback( personas );

    });

    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.emit('crearMensaje', { 
            usuario: 'Administrador', 
            mensaje: `${personaBorrada.nombre} ha abandonado el chat` 
        });
        client.broadcast.emit('listaPersonas', usuarios.obtenerPersonas());

    });

});