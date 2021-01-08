let empleados = [{
    id: 1,
    nombre: 'Víctor'
}, {
    id: 2,
    nombre: 'Nicole'
}, {
    id: 3,
    nombre: 'Keko'
}];

let salarios = [{
    id: 1,
    salario: 1000
}, {
    id: 2,
    salario: 2000
}];

/**
 * returns 
 * {
 *      nombre: 'Nicole',
 *      salario: 2000
 * }
 * @param {integer} empleado el id del empleado
 * @param {callback} callback 
 */
let getSalario = ( empleado, callback ) => {

    let salarioDB = salarios.find( salario => salario.id === empleado );
    let empleadoDB = empleados.find( empleadoo => empleadoo.id === empleado);

    let datos = {
        nombre: empleadoDB,
        salario: salarioDB
    }

    if ( !salarioDB || !empleadoDB ) {
        callback(`No existe un salario o un empleado con el id: ${empleado}`);
    } else {
        callback(null, datos)
    }

}

let getEmpleado = ( id, callback ) => {
    
    let empleadoDB = empleados.find( empleado => empleado.id === id);

    if ( !empleadoDB ) {
        callback(`No existe un usuario con el id: ${id}`);
    } else {
        callback(null, empleadoDB);
    }

}

getEmpleado(1, (err, empleado) => {

    if ( err ) {
        return console.log(err);
    }

    console.log(empleado);
});

getSalario(1, (err, datos) => {
    
    if(err) {
        return console.log(err);
    }

    console.log(datos);

});
