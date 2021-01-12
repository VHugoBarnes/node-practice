const { argv } = require('./config/yargs');
const { crear, listar, actualizar, borrar } = require('./por-hacer/por-hacer');
const { colors } = require('colors');

// Obtiene los comandos de la primera posición
let comando = argv._[0];

// Estructura para controlar el flujo de comandos que se ingresan
switch (comando) {
    case 'crear':
        let tarea = crear( argv.descripcion );
        console.log( tarea );
        break;
    case 'listar':
        let listado = listar(argv.completado);
        console.log('=============Por Hacer=============\n'.green);
        for (const item of listado) {
            console.log('Descripción: '.magenta + `${item.descripcion}`.yellow);
            console.log('Completado: '.magenta + `${item.completado ? 'Sí'.green : 'No'.red}\n`.yellow);
        }
        console.log('==================================='.green);
        break;
    case 'actualizar':
        let accion = actualizar(argv.descripcion, argv.completado);
        if ( accion ) {
            console.log('Se actualizó la tarea');
        } else {
            console.log('No se encontró una tarea con esa descripción');
        }
        break;
    case 'borrar':
        let borrado = borrar(argv.descripcion);
        console.log(`${borrado ? 'Tarea eliminada exitosamente'.green : 'No se encontró la tarea con esa descripción'.red}`);
        break;
    default:
        console.log('Comando invalido');
}