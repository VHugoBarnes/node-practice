const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const app = express();

// Default options
app.use(fileUpload());

app.put('/upload/:tipo/:id', (req, res) => {

    // Si no se mandó ningún archivo
    if(!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No files were uploaded.'
            }
        });
    }

    // Recolectar datos de los params
    let tipo = req.params.tipo;
    let id = req.params.id;

    // Validar tipo
    let tiposValidos = ['productos', 'usuarios'];
    if(tiposValidos.indexOf(tipo) <0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos permitidos son ' + tiposValidos.join(', '),
                tipo
            }
        });
    }

    // Restringir la extensión del archivo a subir
    let extensionesValidas = ['png', 'gif', 'jpg', 'jpeg'];
    // Obtener el archivo de la request
    let archivo = req.files.archivo;
    // Obtener la extensión del archivo
    let nombreSeparado = archivo.name.split('.');
    let extensionArchivo = nombreSeparado[nombreSeparado.length - 1]; // Obtener lo que viene después del punto
    // Validar si la extensión es valida
    if(extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(406).json({
            ok: false,
            err: {
                message: 'Extensión no valida, solo se permite ' + extensionesValidas.join(', '),
                ext: extensionArchivo,
            }
        });
    }

     // El path donde estará guardada la información
     let ruta = `../../../uploads/${tipo}/`;
     // Cambiar el nombre del archivo
     const nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;
     const filePath = path.join(__dirname + ruta) + nombreArchivo;

    // Guardar el archivo
    archivo.mv(filePath, (err) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // En este punto la imagen ya está cargada
        // Mandar a guardar a un path dependiendo el tipo
        if(tipo === 'usuarios') {
            imagenUsuario(id, res, nombreArchivo);
        } else if(tipo === 'productos') {
            imagenProducto(id, res, nombreArchivo);
        }

    });

});

function imagenUsuario(id, res, nombreArchivo) {

    Usuario.findById(id, (err, usuarioBD) => {
        
        // Si ocurrió un error, de todas maneras borrarlo
        if(err) {
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // Si no existe el usuario, borrarlo
        if(!usuarioBD) {
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            });
        }

        // Llamamos a la función de borrar archivo para
        // que borre el registro anterior
        borraArchivo(usuarioBD.img, 'usuarios');

        usuarioBD.img = nombreArchivo;
        usuarioBD.save((err, usuarioGuardado) => {
            res.status(202).json({
                ok: true,
                usuarioGuardado,
                img: nombreArchivo
            });
        });

    });

}

function imagenProducto(id, res, nombreArchivo){

    Producto.findById(id, (err, productoDB) => {

        // Si ocurrió un error, de todas maneras borrarlo
        if(err) {
            borraArchivo(nombreArchivo, 'productos');
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // Si no existe el usuario, borrarlo
        if(!productoDB) {
            borraArchivo(nombreArchivo, 'productos');
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'Producto no existe'
                }
            });
        }

        // Llamamos a la función de borrar archivo para
        // que borre el registro anterior
        borraArchivo(productoDB.img, 'productos');

        // Asignamos el nuevo nombre
        productoDB.img = nombreArchivo;

        // Guardar en la base de datos
        productoDB.save((err, productoGuardado) => {
            res.status(202).json({
                ok: true,
                productoGuardado,
                img: nombreArchivo
            });
        });

    });

}

function borraArchivo(nombreImagen, tipo) {

    let pathURL = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
    if(fs.existsSync(pathURL)){
        fs.unlinkSync(pathURL);
    }

}

module.exports = app;
