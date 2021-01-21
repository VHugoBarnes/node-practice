const express = require('express');
let { verificaToken } = require('../middlewares/auth');
let Categoria = require('../models/categoria');

/** ====================================================
 *   Servicio encargado de mostrar todas las categorías
 *          - Requiere Token
 *  ====================================================*/
app.get('/categoria', (req, res) => {

});

/** ====================================================
 *    Servicio encargado de mostrar categoría por id
 *          - Requiere Token
 *  ====================================================*/
app.get('/categoria/:id', (req, res) => {
    // Categoria.findById()
});

/** ====================================================
 *     Servicio encargado de crear nueva categoría
*          - Requiere Token
 *  ====================================================*/
app.post('/categoria', (req, res) => {
    // Regresa la nueva categoría
    // req.usuario._id
});

/** ====================================================
 *      Servicio encargado de actualizar categoría
*          - Requiere Token
 *  ====================================================*/
app.post('/categoria', (req, res) => {
    // Regresa la categoría ya actualizada
});

/** ====================================================
 *      Servicio encargado de eliminar categoría
*          - Requiere Token
 *  ====================================================*/
app.post('/categoria', (req, res) => {
    // Solo un admin puede borrarlas
    // Categoria.findByIdAndRemove
});



let app = express();

module.exports = app;
