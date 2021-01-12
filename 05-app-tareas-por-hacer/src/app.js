const { argv } = require('./config/yargs');
const { crear, listar } = require('./por-hacer/por-hacer');
const { colors } = require('colors');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = crear( argv.descripcion );
        console.log( tarea );
        break;
    case 'listar':
        let listado = listar();
        console.log('=============Por Hacer=============\n'.green);
        for (const item of listado) {
            console.log(`Descripción: ${item.descripcion}`.yellow);
            console.log(`Completado:${item.completado ? 'Sí' : 'No'}\n`.yellow);
        }
        console.log('==================================='.green);
        break;
    case 'actualizar':
        console.log('Actualizar por hacer');
        break;
    default:
        console.log('Comando invalido');
}