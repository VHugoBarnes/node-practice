import Server from './server/server';
import router from './router/router';
import MySQL from './mysql/mysql';

const server = Server.init(3000);
server.app.use(router);

// Llamar a la instancia de mysql
// MySQL.instance;

server.start(() => {
    
    console.log('Servidor corriendo en el puerto 3000');

});
