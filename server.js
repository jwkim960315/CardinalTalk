const bodyParser = require('body-parser');
const express = require('express');
// const {mongoose} = require('./db/mongoose');
const methodOverride = require('method-override');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.listen(port, () => {console.log(`Server is running at ${port}`)});


app.get('/',(req,res) => {
    res.sendFile(__dirname + '/views/home.html');
});

// Depends on the course data structure
app.get('/catalog', (req,res) => {

});

