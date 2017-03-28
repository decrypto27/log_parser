////////////////////////////////////////////////////////////////////////
//                          Modules                                   //
////////////////////////////////////////////////////////////////////////
var express        = require('express');
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var http           = require('http');


////////////////////////////////////////////////////////////////////////
//                          Dependencies                              //
////////////////////////////////////////////////////////////////////////
var config         = require('config');
var parser         = require('./routes/parser');

var multer         = require('multer');

var app            = express();// app init
//added a comment
////////////////////////////////////////////////////////////////////////
//                          App configuration                         //
////////////////////////////////////////////////////////////////////////
app.use(logger('dev'));
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));


////////////////////////////////////////////////////////////////////////
//                          Api Endpoints                             //
////////////////////////////////////////////////////////////////////////

app.post('/check_for_malicious_content', multer({ dest: './uploads/'}).single('file'), parser.contentFilter );

app.post('/ping',         function (req, res) {
    res.send(200, {}, { pong: true });
});

////////////////////////////////////////////////////////////////////////
//                          Server configuration                      //
////////////////////////////////////////////////////////////////////////

var httpServer = http.createServer(app).listen(config.get('httpPort'), function() {
    console.log('Express HTTP server listening on port ' + config.get('httpPort'));
});

module.exports = app;