const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

const app = express();

// Servicio rest
app.get('/usuario', function (req, res) {
    res.json('get Usuario');
});
 
// Servicio post
app.post('/usuario', function (req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save( (err, usuarioDB) => {
        if ( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});
 
// Servicio put
app.put('/usuario/:id', function (req, res) {
    
    let id = req.params.id;

    res.json({
        id
    });
});
 
// Servicio delete
app.delete('/usuario', function (req, res) {
    res.json('delete Usuario');
});

module.exports = app;
