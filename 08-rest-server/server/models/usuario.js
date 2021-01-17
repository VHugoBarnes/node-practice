const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        // Lo colocamos en [] para personalizar el mensaje
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    img: { // No es obligatoria
        type: String,
        required: [true, 'La imagen es necesaria']
    },
    role: { // Default 'USER_ROLE'
        default: 'USER_ROLE'
    },
    estado: { // Boolean
        type: Boolean,
        default: true
    },
    google: { // Boolean
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('Usuario', usuarioSchema)
