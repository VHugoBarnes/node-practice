let deadpool = {
    nombre: 'Wade',
    apellido: 'Wilson',
    poder: 'Regeneración',
    getNombre: function() {
        return `${this.nombre} ${this.apellido} - poder: ${this.poder}`;
    }
}

console.log(deadpool.getNombre());

let { nombre:nombreDeadpool, apellido, poder } = deadpool;

console.log(nombreDeadpool, apellido, poder);
