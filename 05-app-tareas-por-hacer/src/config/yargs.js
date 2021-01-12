// Configurar comandos
const crear_subcommands = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'descripción de la tarea por hacer'
    }
}
const actualizar_subcommands = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'descripción de la tarea por hacer'
    },
    completado: {
        default: true,
        alias: 'c',
        desc: 'Marca como completado o pendiente la tarea'
    }
}

const argv = require('yargs')
    .command('crear', 'Crea un elemento por hacer', crear_subcommands)
    .command('actualizar', 'Actualiza el estado completado de una tarea', actualizar_subcommands)
    .command('listar', 'Lista las tareas')
    .help().argv;

module.exports = {
    argv
}