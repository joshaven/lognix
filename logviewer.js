// // Variables
// var http = require('http'),
//     fs = require('fs'),
//     file =  '/var/log/install.log';
// 
// // Requires
// 
// 
// http.createServer(function (request, responce) {
//   responce.writeHead(200, {'Content-Type': 'text/plain'});
//   responce.end(fs.readFileSync(file));
// }).listen(8124, "127.0.0.1");
// 
// console.log('Server running at http://127.0.0.1:8124/');
// 
// 


var express = require('express'),
    connect = require('connect'),
    fs      = require('fs'),
    file    = '/var/log/install.log',
    app     = express.createServer();

app.get('/', function(req, res){
  res.header(200, {'Content-Type': 'text/plain'});
  
  // Need to chunk the file to the escapedText function... and maybe chunck the responce?
  res.send('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml"><head><meta content="text/html;charset=utf-8" http-equiv="Content-Type" /><title>Log Viewer</title></head><body>' 
    // + escapedText( fs.readFileSync(file) )
    + fs.readFileSync(file)
    + '</body></html>');
  
  // res.send(fs.readFileSync(file));
});

app.listen(3000);

console.log('Server running at http://127.0.0.1:3000');

function escapedText( str ) {
  return str.replace( 
    /[<&>'"#]/g, 
    function(s) { return {'<':'&lt;', '>':'&gt;', '&':'&amp;', '"':'&quot;', "'":'&#039;', '#':'&#035;' }[s]; });
}
