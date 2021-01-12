const fs = require('fs');
const { colors } = require('colors');

// Por defecto inicializamos el listadoporhacer vacío
let listadoPorHacer = [];

// Guarda en el archivo JSON el arreglo
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar');
    });
}

// Carga el contenido de la base de datos
const cargarDB = () => {
    // try-catch porque puede que el archivo data.json
    // no contenga nada en él.
    try {
        listadoPorHacer = require('../db/data.json');
    } catch ( error ) {
        listadoPorHacer = [];
    }
}

// Acción crear
// Hace push al arreglo con la nueva tarea por hacer.
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

// Carga los datos del JSON
// Y retorna el listado
const listar = ( completado ) => {
    
    cargarDB();

    // Ocurre un bug, cuando se pasa false en el comando,
    // se pasa como un string, así que lo que hace esta condición
    // es convertirlo a booleano
    if (completado === 'true') {
        completado = true
    } else if ( completado === 'false' ){
        completado = false
    }

    // Listar por el filtro dado en el parámetro de la función
    if( completado === undefined ) { // Si completado es undefined
        return listadoPorHacer;
    } else if ( completado || !completado ) { // Si completado es true O false
        return listadoPorHacer.filter( tarea => tarea.completado === completado )
    }
    
}

// Marcar como hecho o no hecho, dependiendo de que se pase por parámetro
const actualizar = ( descripcion, completado = true ) => {

    // Ocurre un bug, cuando se pasa false en el comando,
    // se pasa como un string, así que lo que hace esta condición
    // es convertirlo a booleano
    if (completado === 'true') {
        completado = true
    } else {
        completado = false
    }

    cargarDB();
    // Nos busca el índice de la tarea con la descripción pasada por parámetro
    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion )

    // Si el índice es negativo, quiere decir que no encontró nada
    if( index >= 0 ) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

// Acción para borrar la tarea que coincida con la descripción pasada
// por parámetro
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
