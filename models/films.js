//models/films.js
var mongoose = require('mongoose');

 //remote db connection settings. For security, connectionString should be in a separate file not committed to git
var connectionString = "mongodb://xtrauser:xtrauser@ds217360.mlab.com:17360/schoolstuff";
mongoose.connect(connectionString);
 
 var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

// define Book model in JSON key/value pairs
// values indicate the data type of each key
var filmSchema = mongoose.Schema({
 title: { type: String, required: true },
 director: String,
 releaseDate: Date
 
}); 

//creates model and makes it avalilable to the app
module.exports = mongoose.model('Film', filmSchema);

