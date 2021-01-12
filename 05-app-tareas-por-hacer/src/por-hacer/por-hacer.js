const fs = require('fs');
const { colors } = require('colors');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar')
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch ( error ) {
        listadoPorHacer = [];
    }
}

const crear = ( descripcion ) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

}

const listar = (  ) => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = ( descripcion, completado = true ) => {

    if (completado === 'true') {
        completado = true
    } else {
        completado = false
    }

    cargarDB();
    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion )

    if( index >= 0 ) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = ( descripcion ) => {
    
    cargarDB();

    let longitudDB = listadoPorHacer.length;

    // Filtrar todos las tareas excepto el pasado por la descripción
    let filtro = listadoPorHacer.filter( tarea => tarea.descripcion !== descripcion );
    // Este filter debería devolver todas las tareas que no coincidan con el 
    // pasado por parámetro
    
    let longitudFiltrado = filtro.length;

    // Comprobar si la longitud de los dos arreglos es diferente
    // Esto para comprobar si en realidad se encontró una tarea con esa descripción
    if ( longitudDB !== longitudFiltrado ) { // Si se encontró la tarea
        // Guardar en la base de datos
        datos = JSON.stringify(filtro);
        fs.writeFile('db/data.json', datos, (err) => {
            if (err) throw new Error('No se pudo grabar')
        });
        return true;
    } else {
        return false;
    }



}

module.exports = {
    crear,
    listar,
    actualizar,
    borrar
}
