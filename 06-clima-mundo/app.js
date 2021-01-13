const { argv } = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciuidad para obtener el clima',
        demand: true
    }
});

console.log(argv.direccion);