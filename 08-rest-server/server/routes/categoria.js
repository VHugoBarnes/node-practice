const express = require('express');
let { verificaToken, verificarAdminRole } = require('../middlewares/auth');
let Categoria = require('../models/categoria');

let app = express();

/**
 * Implementación de endpoints para manipular categorías
 * 
 * Para manipularlo requiere de validación por token, colocar
 * en cada enpoint el middleware 'verificaToken'
 * 
 * Los datos del usuario se obtienen del token
 */

/** ====================================================
 *   Servicio encargado de mostrar todas las categorías
 *          - Requiere Token
 *  ====================================================*/
app.get('/categoria', [verificaToken], (req, res) => {

    // Obtener todas las categorías de productos
    // No necesitamos paginarlo puesto que deben 
    // ser pocos en nuestro modelo de negocio

    // Obtenemos con el metodo find
    Categoria.find({}, 'categoria usuario')
        .exec( (err, categorias) => {

            // En caso de que devuelva un error
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            // En caso de que todo sea correcto
            Categoria.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    count: conteo,
                    categorias
                });
            })

        });

});

/** ====================================================
 *    Servicio encargado de mostrar categoría por id
 *          - Requiere Token
 *  ====================================================*/
app.get('/categoria/:id', [verificaToken], (req, res) => {
    
    // Obtener una sola categoría por el id pasado en los params
    
    // Obtener id de los params
    const id = req.params.id;
    
    // Encontrar uno solo
    Categoria.findById(id, (err, categoria) => {

        // En caso de que devuelva un error
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // En caso de que haya encontrado la categoria
        res.status(200).json({
            ok: true,
            categoria
        });

    });

});

/** ====================================================
 *     Servicio encargado de crear nueva categoría
*          - Requiere Token
 *  ====================================================*/
app.post('/categoria', [verificaToken], (req, res) => {

    // ToDo: Verificar duplicidad en las categorias antes de guardarlas
    
    // Regresa la nueva categoría

    // Obtenemos el cuerpo del token que nos devuelve el middleware
    let body = req.body;

    // Preparamos el documento que se guardará en la base de datos
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    // Guardamos en la base de datos
    // Esta función necesita de un callback, con err y res
    categoria.save( (err, categoriaDB) => {
        
        // En caso de que devuelva un error
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // En caso de que el proceso de almacenado sea exitoso
        res.status(200).json({
            ok: true,
            categoria: categoriaDB
        });

    });

});

/** ====================================================
 *      Servicio encargado de actualizar categoría
*          - Requiere Token
 *  ====================================================*/
app.put('/categoria/:id', [verificaToken], (req, res) => {
    
    // Regresa la categoría ya actualizada

    // Obtenemos el id de los params
    const id = req.params.id;
    // Obtenemos la descripción y token del usuario que lo actualizó
    const body = req.body;
    const descripcionAct = body.descripcion;
    const usuarioAct = req.usuario._id;

    // Ejecutamos la actualización
    Categoria.findByIdAndUpdate(
        id, 
        {descripcion: descripcionAct, usuario: usuarioAct},
        { new: true}, 
        (err, categoriaDB) => {

            // En caso de que devuelva un error
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.status(200).json({
                ok: true,
                categoria: categoriaDB
            });

        });

});

/** ====================================================
 *      Servicio encargado de eliminar categoría
 *          - Requiere Token
 *          - Requiere que sea admin
 *  ====================================================*/
app.delete('/categoria/:id', [verificaToken, verificarAdminRole], (req, res) => {
    
    // Solo un admin puede borrarlas

    // Obtenemos el id de los params
    const id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {

        // En caso de que devuelva un error
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // En caso de que encuentre el objeto por el id
        res.status(200).json({
            ok: true,
            categoriaBorrada
        });

    });

});

module.exports = app;
