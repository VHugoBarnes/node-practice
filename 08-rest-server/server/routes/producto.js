const express = require('express');
const { verificaToken } = require('../middlewares/auth');

let app = express();
let Producto = require('../models/producto');

/** ====================================================
 *   Servicio encargado de obtener todos los productos
 *          - Requiere Token
 *  ====================================================*/
app.get('/productos', (req, res) => {
    
    // Traer todos los productos
    // populate: usuario y categoría
    // paginado

});

/** ====================================================
 *     Servicio encargado de obtener un solo producto
 *          - Requiere Token
 *  ====================================================*/
app.get('/productos/:id', (req, res) => {
    
    // populate: usuario y categoría

});

/** ====================================================
 *      Servicio encargado de crear un producto
 *          - Requiere Token
 *  ====================================================*/
app.post('/productos/', (req, res) => {
    
    // Grabar el usuario
    // Grabar una categoria del listado en la BD

});

/** ====================================================
 *      Servicio encargado de actualizar un producto
 *          - Requiere Token
 *  ====================================================*/
app.put('/productos/:id', (req, res) => {
    
    // Actualizar un producto

});

/** ====================================================
 *      Servicio encargado de eliminar un producto
 *          - Requiere Token
 *  ====================================================*/
app.delete('/productos/:id', (req, res) => {
    
    // Actualizar la disponibilidad

});


module.exports = app;