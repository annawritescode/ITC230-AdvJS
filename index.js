var http = require('http');
var fs = require("fs");



http.createServer(function (req, res) {
    //changes url to lower
    var path = req.url.toLowerCase();
    
    // Using switch for Path
       switch(path) {
      
        case'':
          fs.readFile(res,'ITC230-AdvJS/home.html', 'text/html');
          break;
    
        case'/about':
          fs.readFile(res,'ITC230/about.html',' text/html');
           res.writeHead(200, {'Content-Type': 'text/plain'});
           res.end('About Page');
           break;
       default:
           res.writeHead(404, {'Content-Type': 'text/plain'});
           res.end('404:Page not found.');
           break;
  }


}).listen(process.env.PORT, process.env.IP);
//console.log('Server running at http://127.0.0.1:8081/');




