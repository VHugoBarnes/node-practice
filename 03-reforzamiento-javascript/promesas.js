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

let getEmpleado = ( id ) => {

    return new Promise((resolve, reject) => {

        let empleadoDB = empleados.find( empleado => empleado.id === id);
    
        if ( !empleadoDB ) {
            reject(`No existe un usuario con el id: ${id}`);
        } else {
            resolve(empleadoDB);
        }

    });

}

let getSalario = ( empleado ) => {

    return new Promise(( resolve, reject ) => {
        let salarioDB = salarios.find( salario => salario.id === empleado );
        let empleadoDB = empleados.find( empleadoo => empleadoo.id === empleado);

        let datos = {
            nombre: empleadoDB,
            salario: salarioDB
        }

        if ( !salarioDB || !empleadoDB ) {
            reject(`No existe un salario o un empleado con el id: ${empleado}`);
        } else {
            resolve(datos)
        }
    });

}

getEmpleado(1).then( empleado => {
    console.log('Empleado de base de datos ', empleado);
}).catch( err => {
    console.log(err);
});

getSalario(2).then( empleado => {
    console.log('Salario de base de datos', empleado);
}).catch( err => {
    console.log(err);
});
