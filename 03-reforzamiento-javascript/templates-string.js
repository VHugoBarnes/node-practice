let nombre = 'Deadpool';
let real = 'Wade Wilson';

console.log( nombre + ' ' + real );
console.log(`${ 1 + 2 }`);
console.log(`${ nombre } ${real}`);

let nombreCompleto = nombre + ' ' + real;
let nombreTemplate = `${nombre} ${real}`;

console.log( nombreCompleto === nombreTemplate );

function getNombre(){
    return `${ nombre } es: ${ real }`;
}

console.log(`El nombre de ${ getNombre() }`);
