const { argv } = require('./config/yargs');
const { crear } = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = crear( argv.descripcion );
        console.log( tarea );
        break;
    case 'listar':
        console.log('Listar por hacer');
        break;
    case 'actualizar':
        console.log('Actualizar por hacer');
        break;
    default:
        console.log('Comando invalido');
}