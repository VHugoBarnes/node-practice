const express = require('express');
const fs = require('fs');
const path = require('path');

let app = express();

app.get('/imagen/:tipo/:img', (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImg = `./uploads/${tipo}/${img}`;
    let root = path.join(__dirname + '../../assets/');
    res.sendFile('no-image.jpg', {root});

});

module.exports = app;
