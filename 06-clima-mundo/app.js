const axios = require('axios').default;
const { argv } = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciuidad para obtener el clima',
        demand: true
    }
});
const { API_KEY } = require('./secrets');

const instance = axios.create({
    baseURL:'http://api.weatherapi.com/v1/current.json',
    params: {
        q: `${ argv.direccion }`
    },
    headers: {
        key: API_KEY
    }
});
console.log(argv.direccion);
instance.get()
    .then( resp => {
        console.log(resp.data.current.temp_c);
    })
    .catch( err => {
        console.log(err);
    });