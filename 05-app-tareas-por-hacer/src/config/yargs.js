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
        desc: 'descripción de la tarea por actualizar'
    },
    completado: {
        default: true,
        alias: 'c',
        desc: 'Marca como completado o pendiente la tarea'
    }
}

const listar_subcommands = {
    completado: {
        alias: 'c',
        desc: 'Filtra las tareas completadas o no completadas, usa true o false'
    }
}

const borrar_subcommands = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'descripción de la tarea por borrar'
    },
}

const argv = require('yargs')
    .command('crear', 'Crea un elemento por hacer', crear_subcommands)
    .command('actualizar', 'Actualiza el estado completado de una tarea', actualizar_subcommands)
    .command('listar', 'Lista las tareas', listar_subcommands)
    .command('borrar', 'Borrar una tarea por hacer', borrar_subcommands)
    .help().argv;

module.exports = {
    argv
}