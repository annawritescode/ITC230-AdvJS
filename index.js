var http = require('http');
var fs = require("fs");
var films = require('./ITC230-AdvJS/lib/films');


http.createServer(function (req, res) {
    //changes url to lower
    var path = req.url.toLowerCase();
    
    // Using switch for Path
       switch(path) {
      
        case'/':

          fs.readFile('home.html', function (err, data) {
                if (err) return console.error(err);
                 res.writeHead(200, {'Content-Type': 'text/html'});
                 res.end(data);
                 console.log(data.toString());
            });
          break;
    
        case'/about':
      
           res.writeHead(200, {'Content-Type': 'text/plain'});
           res.end('About Page');
           break;
           
        //all lower case because var path wont find camelcase   
        case'/getall':
         
           res.writeHead(200, {'Content-Type': 'text/plain'});
           res.write(JSON.stringify(films.getAllFilms()));
           res.end('results');
           break;
           
         case'/get':
          
           res.writeHead(200, {'Content-Type': 'text/plain'});
           res.write(JSON.stringify(films.findTitle('Iris')));
          
           break;   
          
        case'/delete':
           res.writeHead(200, {'Content-Type': 'text/plain'});
           res.write(JSON.stringify(films.delete('Iris')));
           res.end('Item deleted');
           break;   
           
       default:
           res.writeHead(404, {'Content-Type': 'text/plain'});
           res.end('404:Page not found.');
           break;
  }


}).listen(process.env.PORT || 3000);
//console.log('Server running at http://127.0.0.1:8081/');




