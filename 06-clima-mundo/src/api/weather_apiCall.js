const axios = require('axios').default;
const { API_KEY } = require('../secrets');

const obtenerClima = async( direccion ) => {

    const instance = axios.create({
        baseURL:'http://api.weatherapi.com/v1/current.json',
        params: {
            q: `${ direccion }`
        },
        headers: {
            key: API_KEY
        }
    });

    try {

        const data = await instance.get();
        // console.log(data.data);
        console.log(`El clima en ${direccion} es de ${data.data.current.temp_c}°C`);

    } catch (error) {
        console.log(error);
    }


}

module.exports = {
    obtenerClima
}
