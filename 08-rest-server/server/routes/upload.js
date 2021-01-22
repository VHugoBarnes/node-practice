const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const { sample } = require('underscore');

const app = express();

// Default options
app.use(fileUpload({useTempFiles : true}));

app.put('/upload', (req, res) => {

    if(!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No files were uploaded.'
            }
        });
    }

    // Obtener el archivo de la request
    let archivo = req.files.archivo;
    // El path donde estará guardada la información
    const filePath = path.join(__dirname + '../../../uploads/') + archivo.name;
    // Restringir la extensión del archivo a subir
    let extensionesValidas = ['png', 'gif', 'jpg', 'jpeg'];
    // Obtener la extensión del archivo
    let nombreArchivo = archivo.name.split('.');
    let extensionArchivo = nombreArchivo[nombreArchivo.length - 1]; // Obtener lo que viene después del punto

    if(extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(406).json({
            ok: false,
            err: {
                message: 'Extensión no valida, solo se permite ' + extensionesValidas.join(', '),
                ext: extensionArchivo,
            }
        });
    }

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
