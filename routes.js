var routes = require('./routes.js')(app); // pass ‘app’ instance to the routes module


app.get('/api/books', (req,res) => {
  var books = book.getAll(); // return all items in book array
  if (books) {
    // res.json sets appropriate status code and response header
    res.json(books);
  } else {
    return res.status(500).send('Error occurred: database error.');
  }
});





// return all records
app.get('api/getall', (req, res) => {
        var film = film.getall();
        if(film){
            res.json(film);
        }else{
            return res.status(500).send('error occured: database error.');
        }
 
//post result
app.post('api/get', (req,res) => {
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


app.post('/add', (req, res,next) => {
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