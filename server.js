const bodyParser = require('body-parser');
const express = require('express');
// const {mongoose} = require('./db/mongoose');
const methodOverride = require('method-override');
var courseInfos;

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/js', express.static(__dirname + '/node_modules'))

app.use(express.static(__dirname));

app.set('view engine', 'ejs');


app.listen(port, () => {console.log(`Server is running at ${port}`)});


app.get('/',(req,res) => {
    res.sendFile(__dirname + '/views/home.html');
});

app.get('/api/courses',(req,res) => {
    app.get('/Keyword?='+req.query.urlExtension,(request,result) => {
        res.sendFile(__dirname + '/views/home.html');
    });
});


app.get('/catalog', (req,res) => {
    res.render('catalog',{});
});
