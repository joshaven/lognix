var express = require('express'),
    connect = require('connect'),
    fs      = require('fs'),
    file    = '/var/log/install.log',
    app     = express.createServer();

// Default URL
app.get('/', function(req, res){
  console.log('Redirecting to: /public/index.html');
  res.redirect('/public/index.html');  
});

// Respond to any files in the public folder
app.get('/public/*.*', function(req, res, params){
  var req_type = res.contentType('.'+req.url);
  console.log(' --> '+req.method+'(HTTP/'+req.httpVersion+') "'+req.url+'" <'+req_type+'>');
  res.send(fs.readFileSync('.'+req.url, 'utf8'));
});

app.listen(3000);

console.log('Server running at http://127.0.0.1:3000');
// 
// 
// 
// function escapedText( str ) {
//   return str.replace( 
//     /[<&>'"#]/g, 
//     function(s) { return {'<':'&lt;', '>':'&gt;', '&':'&amp;', '"':'&quot;', "'":'&#039;', '#':'&#035;' }[s]; });
// }
// 
// // The following may be faster, this should be checked.
// // function escapedText(mystring){
// //   return mystring.replace(/&/g, "&amp;").replace(/#/:'&#035;').replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g:'&#039;');
// //   };
