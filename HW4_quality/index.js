'use strict';
const express = require("express");
const app = express();
var films = require('./lib/films');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions


let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");



 {
  
  // send content of 'home' view
app.get('/', (req,res) => {
 res.render('home');
});

  
// // send static file as response
// app.get('/', (req, res) => {
//  res.type('text/html');
//  res.sendFile(__dirname + '/home.html'); 
// });

// send plain text response
app.get('/about', (req, res) => {
 res.type('text/plain');
 res.send('About page');
});


// send plain text response
app.get('/getall', (req, res) => {
 res.type('text/plain');
 
});
// send content of 'home' view
app.get('/get', (req,res) => {
 let result = films.findTitle(req.query.title);
 res.render('details', {title: req.query.title, result: result });
});

app.post('/get', (req,res) => {
 let result = films.findTitle(req.body.title);
 res.render('details', {title: req.body.title, result: result });
});

// send plain text response
app.get('/delete', (req, res) => {
 res.type('text/plain');
 
});



// define 404 handler
app.use( (req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});
    

  
 

}

app.listen(app.get('port'), () => {
 console.log('Express started'); 
});
