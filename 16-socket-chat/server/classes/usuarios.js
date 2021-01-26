
/**
 * El objeto de Usuarios quedaría algo así:
 * 
 * {
 *      id: 'ssdasSASfxcht-44f3d',
 *      nombre: 'Nicole',
 *      sala: 'Sailor Moon'
 * }
 */

class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        // Creamos a la persona conforme a lo pasado por parámetro
        let persona = { id, nombre, sala };
        // Agregamos a la persona en la lista de personas
        this.personas.push(persona);

        return this.personas;

    }

    obtenerPersona(id) {

        // Hacemos un filtro por id del arreglo de personas del chat,
        // creo que obtener el indice al final es un poco redundante, puesto
        // que el id es único
        let persona = this.personas.filter( persona => persona.id === id )[0];

        return persona;

    }

    obtenerPersonas() {
        return this.personas;
    }

    obtenerPersonasPorSala(sala) {
        // ToDo: Implementar la salas
    }

    borrarPersona(id) {

        // Antes de borrar la relación de la lista obtenemos el objeto
        let personaBorrada = this.obtenerPersona(id);
        
        // Hacemos un filtro que nos devuelva a todas las personas excepto a la
        // del id.
        this.personas = this.personas.filter(persona => persona.id !== id);

        return personaBorrada;

    }

}

module.exports = {
    Usuarios
};
