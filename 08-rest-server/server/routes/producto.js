const express = require('express');
const { verificaToken } = require('../middlewares/auth');

let app = express();
let Producto = require('../models/producto');

/** ====================================================
 *   Servicio encargado de obtener todos los productos
 *          - Requiere Token
 *  ====================================================*/
app.get('/productos', [verificaToken], (req, res) => {
    
    // Traer todos los productos
    // populate: usuario y categoría
    // paginado

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(5)
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {

            // En caso de que devuelva un error
            if( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            // En caso de haberlo encontrado
            res.status(200).json({
                ok: true,
                producto: productoDB
            });

        });

});

/** ====================================================
 *     Servicio encargado de obtener un solo producto
 *          - Requiere Token
 *  ====================================================*/
app.get('/productos/:id', [verificaToken], (req, res) => {
    
    // populate: usuario y categoría

    // Obtener id de los params
    const id = req.params.id;

    // Encontrar uno solo
    Producto.findById(id, (err, productoDB) => {

        // En caso de que devuelva un error
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // En caso de haberlo encontrado
        res.status(200).json({
            ok: true,
            producto: productoDB
        });

    });

});

/** ====================================================
 *      Servicio encargado de crear un producto
 *          - Requiere Token
 *  ====================================================*/
app.post('/productos/', [verificaToken], (req, res) => {

    // ToDo: Realizar validación si la categoría existe
    
    // Grabar el usuario
    // Grabar una categoria del listado en la BD

    // Obtenemos el cuerpo de la petición
    let body = req.body;

    // Preparamos el documento que se guardará en la base de datos
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.preciouni,
        descripcion: body?.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    // Lo guardamos en la base de datos
    producto.save((err, productoBD) => {

        // En caso de que devuelva un error
        if( err ) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // En caso de que el almacenado sea exitoso
        res.status(201).json({
            ok: true,
            producto: productoBD
        });

    });

});

/** ====================================================
 *      Servicio encargado de actualizar un producto
 *          - Requiere Token
 *  ====================================================*/
app.put('/productos/:id', [verificaToken], (req, res) => {
    
    // ToDo: Verificar si la categoría existe

    // Actualizar un producto
    /* Solo se puede actualizar:
     *  - nombre
     *  - precioUni
     *  - descripcion
     *  - disponible
     *  - categoria
     *  - usuario
     * 
     *  Basicamente, todo XD
    */

    // Obtenemos el id de los params
    const id = req.params.id;
    // Obtenemos el body y el id del usuario que lo actualizó
    const body = req.body;
    const usuario = req.usuario._id;

    // Construir objeto que va a actualizar
    let actualizar = { usuario };

    // Esto da la posibilidad de actualizar solo la parte que nos manden 
    // en el body, creo que puede funcionar para que la petición no sea tan
    // grande.
    body.nombre ? actualizar = {...actualizar, nombre: body.nombre} : ''
    body.preciouni ? actualizar = {...actualizar, precioUni: body.preciouni} : ''
    body.descripcion ? actualizar = {...actualizar, descripcion: body.descripcion} : ''
    body.disponible ? disponible = {...actualizar, disponible: body.disponible} : ''
    body.categoria ? actualizar = {...actualizar, categoria: body.categoria} : ''

    // Ejecutamos la actualización
    Producto.findByIdAndUpdate(
        id,
        actualizar,
        {new: true},
        (err, productoBD) => {

            // En caso de que devuelva un error
            if( err ) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.status(202).json({
                ok: true,
                producto: productoBD
            });

        }
    );


});

/** ====================================================
 *      Servicio encargado de eliminar un producto
 *          - Requiere Token
 *  ====================================================*/
app.delete('/productos/:id', [verificaToken], (req, res) => {
    
    // Actualizar la disponibilidad

    // Obtener id de los params
    const id = req.params.id;

    let cambiarDisponibilidad = {
        disponible: false
    }

    Producto.findByIdAndUpdate(id, cambiarDisponibilidad, {new: true}, (err, productoDB) => {

        // En caso de que devuelva un error
        if( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!productoDB) {
            return res.status(204).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }

        res.status(202).json({
            ok: true,
            producto: productoDB
        });

    });

});


module.exports = app;