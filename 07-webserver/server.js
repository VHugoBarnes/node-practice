const express = require('express');
const app = express();
const hbs = require('hbs');
require('./hbs/helpers')

app.use( express.static(__dirname + '/public') );

// Express HBS
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
 
app.get('/home', (req, res) => {

    res.render('home', {
        nombre: 'Víctor'
    });

});

app.get('/about', (req, res) => {

    res.render('about', {
        nombre: 'Víctor'
    });

});

app.listen(3000, () => {
    console.log('Escuchando peticiones en el puerto 3000');
});
