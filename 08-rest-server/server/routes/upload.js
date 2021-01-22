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

    let archivo = req.files.archivo;
    const filePath = path.join(__dirname + '../../../uploads/') + archivo.name;

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
