//server page
'use strict';
const express = require("express");
const app = express();
var Film = require('./models/films');


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions


let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");


  
  // send content of 'home' view
app.get('/', (req,res) => {
// res.type('text/html');
 res.render('home');
});

// send plain text response
app.get('/about', (req, res) => {
 res.type('text/plain');
 res.render('About page');
});


// return all records
app.get('/getall', (req, res) => {
 // return all records
 Film.find({}, (err, title)=> {
   //console.log(err);
   //console.log(film);
   if (err) return (err);
   console.log(title.length);
  // res.render('home',{Films:title});
   // other code here
  
 });
});
//post result
app.post('/get', (req,res) => {
   Film.find({title:req.body.title}, (err, film) => {
    //console.log(req.query.title);
   if (err) return (err);
     res.type('text/html');
     res.render('details', {title:req.body.title,film}); 
});
});

//find specific record
app.get('/get', (req,res,next) => {
  //test console.log(req.query.title);
  Film.findOne({title:req.query.title.toLowerCase}, (err, film) => {
     console.log(err);
    console.log(film);
   if (err) return next(err);
    res.type('text/html');
       res.render('details', {title:req.query.title, result: film}); 
   // other code here
 });
});

//post result
app.post('/get', (req,res) => {
   Film.findOne({title: req.body.title}, (err, film) => {
    //console.log(req.query.title);
   if (err) return (err);
     res.type('text/html');
     res.render('details', {title:req.body.title,film}); 
});
});


// 

// delete item
app.get('/delete', (req,res,next) => { 
 Film.remove({title: req.query.title}, (err, result) => {
  let deleted = result;
  if(err) return next(err);
  res.type('text/html');
  res.render('delete', { title: req.query.title, deleted: deleted});
 
});
});


//var newFilm = {"title":"Iris", "director":"Albert Maysles","releaseDate":"2014"}
// app.get('/add', (req,res,next) => {
// Film.update({"title": req.body.title, 
//              // "director": req.body.director,
//                //"release date": req.body.releaseDate}, 
// },
//                (err, result)=>{
//   if(err) return next(err);
//   let add= req.body.title;
//   //console.log(result);
//   res.type('text/html');
//   res.render('add', { title: req.query.title});
 
//});
//});


app.post('/add', (req, res) => {
    let obj = {
        title: req.body.title, 
        director: req.body.director,
        year: req.body.releaseDate
    };
    Film.create(obj, (err, films) =>{
        if(err) return (err);
        res.type('text/html');
        res.render('add', {result: Film, title: req.query.title});
});
});

// define 404 handler
app.use( (req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});
    

  
app.listen(app.get('port'), () => {
console.log('Express started'); 
});



