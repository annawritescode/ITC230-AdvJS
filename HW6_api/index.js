//server page
'use strict';
const express = require("express");
const app = express();
var Film = require('./models/films');
let bodyParser = require("body-parser");


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions
app.use(bodyParser.json());


let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");


  
  // send content of 'home' view
app.get('/', (req,res,next) => {
 Film.find((err,films)=>{
  console.log();
  if(err) return next(err);
  res.render('home_app',{films:JSON.stringify(films)});
 });
 

//res.type('text/html');
 //res.render('home_app');
});

// send plain text response
app.get('/about', (req, res) => {
 res.type('text/plain');
 res.render('About page');
});


// return all records
// test url https://2563718b9050453e88f8755bff79bc10.vfs.cloud9.us-east-2.amazonaws.com/api/film/
app.get('/api/titles/', (req, res) => {
 // return all records
Film.find({}, (err, titles) => {
     //console.log(err);
    //console.log(film);
   if (err) return (err);
   res.json(titles);
  
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
app.get('/api/title/:title', (req,res,next) => {
  //test console.log(req.query.title);
  //allows to find title in upper and lower case
  const filmTitle= new RegExp(req.params.title,'i');
  Film.findOne({title:filmTitle}, (err, title) => {
     //console.log(err);
    //console.log(film);
   if (err) return next(err);
   res.json(title);
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
// test url https://2563718b9050453e88f8755bff79bc10.vfs.cloud9.us-east-2.amazonaws.com/api/delete/amelia
app.get('/api/delete/:id', (req,res,next) => { 
Film.remove({"_id":req.params.id}, (err, result) => {
     console.log(err);
    console.log(result);
   if (err) return next(err);
   res.json({"deleted": result.result.n});
 
});
});

// add an item to database
// test url https://2563718b9050453e88f8755bff79bc10.vfs.cloud9.us-east-2.amazonaws.com/api/film/add/movie2/dude/2018

app.post('/api/film/add/', (req, res,next) => {
  //find and update existing item. If none exists add new item
 if(!req.body._id) {//inserts new document
    let film = new Film({ title:req.body.title, director:req.body.director,releaseDate:req.body.releaseDate});
    console.log();
    film.save((err,newFilm) =>{
     if(err) return next(err);
     
     res.json({updated:0, id:newFilm._id});
    });
 }else{
  Film.updateOne({ _id: req.body._id}, {title:req.body.title, director: req.body.director, releaseDate: req.body.releaseDate }, (err, result) => {
  if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
 
});
 }    
    
    });


// define 404 handler
app.use( (req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});
    

  
app.listen(app.get('port'), (req) => {
console.log('Express started');
//console.log(`${req.method} request for '${req.url}'`)
});



