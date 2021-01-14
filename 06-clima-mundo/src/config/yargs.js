// Archivo de configuración de comandos
const { argv } = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciuidad para obtener el clima',
        demand: true
    }
});

module.exports = {
    argv
}