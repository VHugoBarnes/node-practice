const { argv } = require('./config/yargs');
const { obtenerClima } = require('./api/weather_apiCall');

const lugar = argv.direccion;

obtenerClima(lugar);