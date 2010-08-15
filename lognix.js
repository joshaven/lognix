// TODO: move the console.log statements to a log function... then log to the console or systemlog based upon log level & environment
process.chdir(__dirname)

var fs      = require('fs'),
    sys     = require('sys'),
    exec    = require('child_process').exec,
    connect = require('./lib/connect'),
    mime    = require('./lib/connect/utils').mime;


function lognix(app) {
  // View log file
  app.get(/\/log\/.*[\._]log.json/, function(req, res, params){
    var path = req.url.split(/\.json/i)[0],
        data = JSON.stringify(fs.readFileSync('/var'+path, 'utf8').split('\n'));
    res.writeHead(200, { 'Content-Type':mime.type('.json'), 'Content-Length':data.length });
    res.end(data);
  });
  
  // List avilable log files
  app.get('/logs', function(req, res){
    exec('find /var/log -type f', function(error, stdout, stderr){
      var str=JSON.stringify(new String(stdout));

      res.writeHead(200, { 'Content-Type':mime.type('.json'), 'Content-Length':str.length });
      res.end(str);
    });   
  });
};



// Listen for requests
connect.createServer(
  connect.staticProvider(__dirname + '/public'),
  connect.router(lognix)
).listen(3000);

console.log('Server running at http://127.0.0.1:3000');
