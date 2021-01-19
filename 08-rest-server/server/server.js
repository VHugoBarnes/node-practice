const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
require('./config/config');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// Configuración global de las rutas
app.use(require('./routes/index'));

 
mongoose.connect('mongodb://localhost:27017/cafe',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  } ,(err, res) => {
    if(err) throw err;

    console.log('Base de datos online');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto: ', process.env.PORT);
});
