const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }

}

class TicketControl {

    constructor() {

        // Variables
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];

        let data = require('../data/data.json');
        
        if(data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;
        } else {
            this.reiniciarConteo();
        }

    }

    siguienteTicket() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        // El método push añade uno o más elementos al final de un array
        this.tickets.push(ticket);

        // Graba el current state
        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    atenderTicket(escritorio) {

        // Si no hay tickets por atender
        if(this.tickets.length === 0) {
            return 'No hay tickets';
        }

        // Extrae la propiedad numero del primer elemento del array tickets
        let numeroTicket = this.tickets[0].numero;
        // La propiedad shift extrae el primer elemento del arreglo y lo retorna.
        this.tickets.shift();

        // Crea un nuevo objeto Ticket con propiedades de numero y escritorio
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        // Agrega uno o más elementos al inicio del array.
        // Devuelve la nueva longitud del arreglo.
        this.ultimosCuatro.unshift(atenderTicket);
    
        // En caso de sobrepasar los 4 elementos del arreglo, procede a eliminar
        // el último elemento en el arreglo.
        if(this.ultimosCuatro.length > 4) {
            this.ultimosCuatro.splice(-1, 1); // Borra el último (-1) elemento
        }

        console.log('Ultimos 4', this.ultimosCuatro);

        this.grabarArchivo();

        return atenderTicket;

    }

    reiniciarConteo() {
        
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();

    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        };

        // Prepara en formato JSON el objeto jsonData para
        // guardarlo con fs (fileSystem)
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

}

module.exports = {
    TicketControl
}
