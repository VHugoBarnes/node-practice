const builders = {
    base: {
        demand: true,
        alias: 'b'
    },
    limite: {
        alias: 'l',
        default: 10
    }
}

const argv = require('yargs')
    .command('listar', 'Imprime en consola la tabla de multiplicar', builders)
    .command('crear', 'Crea un archivo txt con los parámetros establecidos', builders)
    .help().argv;

module.exports = {
    argv
}