// TODO: move the console.log statements to a log function... then log to the console or systemlog based upon log level & environment

var express = require('express'),
    connect = require('connect'),
    fs      = require('fs'),
    sys     = require('sys'),
    file    = '/var/log/install.log',
    app     = express.createServer();
  

// Listen for requests
app.listen(3000);
console.log('Server running at http://127.0.0.1:3000');

// Default URL
app.get('/', function(req, res){
  console.log('Redirecting to: /public/index.html');
  res.redirect('/public/index.html');  
});

// Respond to any files in the public folder
app.get('/public/*.*', function(req, res){
  var req_type = res.contentType('.'+req.url);
  console.log(' --> '+req.method+'(HTTP/'+req.httpVersion+') "'+req.url+'" <'+req_type+'>');
// TODO: Implement or confirm that TTL's are already implemented...
//    response['Expires'] = [(Time.now + 20*60).httpdate]  
// TODO: Change IO to non-blocking method
  res.send(fs.readFileSync('.'+req.url, 'utf8'));
});

// View log file
// TODO: The new line chars are lost... need to do some type of markup
app.get('/log/*.log', function(req, res){
  var req_type = res.contentType('.'+req.url);
  console.log(' --> '+req.method+'(HTTP/'+req.httpVersion+') "'+req.url+'" <'+req_type+'>');
  res.send( fs.readFileSync('/var'+req.url, 'utf8') );
});

// List avilable log files
app.get('/logs', function(req, res){
  console.log('found /logs')
  var sys   = require('sys'),
      spawn = require('child_process').spawn,
      ls    = spawn('ls', ['/var/log']);

  ls.stdout.on('data', function (data) {
    var req_type = res.contentType('.'+req.url);
    console.log(' --> '+req.method+'(HTTP/'+req.httpVersion+') "'+req.url+'" <'+req_type+'>');
    res.send( data );
  });

  ls.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  ls.on('exit', function (code) {
    console.log('child process exited with code ' + code);
  });
});


