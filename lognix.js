// TODO: move the console.log statements to a log function... then log to the console or systemlog based upon log level & environment
process.chdir(__dirname)

var express = require('express'),
    connect = require('connect'),
    fs      = require('fs'),
    sys     = require('sys'),
    app     = express.createServer();

app.configure(function(){
    app.use(connect.staticProvider(__dirname + '/public'));
});

// Listen for requests
app.listen(3000);

console.log('Server running at http://127.0.0.1:3000');

// Default URL
app.get('/(index.html?)?', function(req, res){
    var url='/public/index.html',
        req_type = res.contentType(url);
    // console.log(' --> '+req.method+'(HTTP/'+req.httpVersion+') "'+req.url+'" <'+req_type+'>');
    res.send(fs.readFileSync('.'+url, 'utf8'));  
});

// View log file
app.get(/\/log\/.*[\._]log.json/, function(req, res, params){
  var path = req.url.split(/\.json/i)[0],
      data = fs.readFileSync('/var'+path, 'utf8').split('\n')
      req_type = res.contentType({test:true});
  // console.log(' --> '+req.method+'(HTTP/'+req.httpVersion+') "'+req.url+'" <'+req_type+'>');
  res.send( data );
});

// List avilable log files
app.get('/logs', function(req, res){
  var sys   = require('sys'),
      spawn = require('child_process').spawn,
      ls    = spawn('find', ['/var/log', '-type', 'f']);

  ls.stdout.on('data', function (data) {
    var req_type = res.contentType('.'+req.url);
    // console.log(' --> '+req.method+'(HTTP/'+req.httpVersion+') "'+req.url+'" <'+req_type+'>');
    res.send( data );
  });

  ls.stderr.on('data', function (data) {
    // console.log('stderr: ' + data);
  });
});