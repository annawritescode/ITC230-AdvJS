var http = require('http');
var fs = require("fs");



http.createServer(function (req, res) {
    //changes url to lower
    var path = req.url.toLowerCase();
    
    // Using switch for Path

}).listen(process.env.PORT, process.env.IP);
//console.log('Server running at http://127.0.0.1:8081/');




