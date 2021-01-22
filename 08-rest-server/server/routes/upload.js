const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const { sample } = require('underscore');

const Usuario = require('../models/usuario');
const app = express();

// Default options
app.use(fileUpload());

app.put('/upload/:tipo/:id', (req, res) => {

    // Recolectar datos de los params
    let tipo = req.params.tipo;
    let id = req.params.id;

    // Si no se mandó ningún archivo
    if(!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No files were uploaded.'
            }
        });
    }

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

    // Obtener el archivo de la request
    let archivo = req.files.archivo;

    // Restringir la extensión del archivo a subir
    let extensionesValidas = ['png', 'gif', 'jpg', 'jpeg'];
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

        res.status(201).json({
            ok: true,
            message: 'File Uploaded'
        });

    });

});

module.exports = app;
