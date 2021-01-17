const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app = express();

// Servicio rest
app.get('/usuario', (req, res) => {
    res.json('get Usuario');
});
 
// Servicio post
app.post('/usuario', (req, res) => {
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
app.put('/usuario/:id', async(req, res) => {
    
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    await Usuario.findByIdAndUpdate( id, body, { new: true, runValidators: true}, (err, usuarioDB) => {
        
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            id,
            usuario: usuarioDB
        });
    });

});
 
// Servicio delete
app.delete('/usuario', (req, res) => {
    res.json('delete Usuario');
});

module.exports = app;
