const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        // Lo colocamos en [] para personalizar el mensaje
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    img: { // No es obligatoria
        type: String
    },
    role: { // Default 'USER_ROLE'
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
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

usuarioSchema.plugin( uniqueValidator, {
    message: '{PATH} debe de ser único'
} );

module.exports = mongoose.model('Usuario', usuarioSchema)
