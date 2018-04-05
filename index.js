var http = require('http');
var fs = require("fs");
http.createServer(function (req, res) {
    fs.readFile("home.html", function(err, data){
      res.writeHead(200, {'Content-type': 'text/html'});
      res.write(data);
      res.end();   
    });
    
   
}).listen(process.env.PORT, process.env.IP);
console.log('Server running at http://127.0.0.1:8081/');