const express = require('express');

const app = express();

// Servicio rest
app.get('/usuario', function (req, res) {
    res.json('get Usuario');
});
 
// Servicio post
app.post('/usuario', function (req, res) {
    let body = req.body;

    if ( body.nombre === undefined ) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {

    }

    res.json({
        body
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
