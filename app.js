var express = require('express');
var path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

require("./routers/home")(app);
require("./routers/get-tweet")(app);
require("./routers/get-tweet-png")(app);

var server = require('http').createServer(app);

var port = process.env.PORT || 3000;
server.listen(port);

console.log("Listening port "+port);