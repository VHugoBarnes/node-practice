const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
// Servicio rest
app.get('/usuario', function (req, res) {
    res.json('get Usuario');
});
 
// Servicio post
app.post('/usuario', function (req, res) {
    let body = req.body;
    res.json({
        body
    });
});
 
// Servicio put
app.put('/usuario/:id', function (req, res) {
    
    let id = req.params.id;

    res.json({
        id
    });
});
 
// Servicio delete
app.delete('/usuario', function (req, res) {
    res.json('delete Usuario');
});
 
app.listen(3000, () => {
    console.log('Escuchando el puerto: ', 3000);
});