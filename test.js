var Film = require("./models/films");

Film.find({}, (err, films) => {
    console.log('find')

   console.log(films.length);
   console.log(films);
 });
