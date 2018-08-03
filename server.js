// node modules
var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var server          = require('http').createServer(app);
var io              = require('socket.io')(server);
const EventEmitter  = require('events');

// app config / constants
app.eventEmitter = new EventEmitter();
app.paths = {
  modules: __dirname + '/server/modules',
  config: __dirname + '/server/_config',
  public: __dirname + '/public/dist',
  server: __dirname + '/server'
}

// set our port
var port = process.env.PORT || 6060;

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location
app.use(express.static(app.paths.public));

// app modules
var configModule  = require(app.paths.modules + '/config')(app, process, io);
var storageModule = require(app.paths.modules + '/storage')(app, configModule, process, io);
var roiModule     = require(app.paths.modules + '/roi')(app, configModule, captureModule);
var cropModule    = require(app.paths.modules + '/crop')(app, configModule, captureModule, io);
var processModule = require(app.paths.modules + '/process')(app, configModule, io);
var dataModule    = require(app.paths.modules + '/data')(app, configModule, processModule, io);

if(process.platform == 'linux') {
  var piModule    = require(app.paths.modules + '/pi')(app, io);
  var captureModule = require(app.paths.modules + '/capture')(app, configModule, io);
  var previewModule = require(app.paths.modules + '/preview')(app, configModule, io);
} else {
  var piModule    = require(app.paths.modules + '/fake-pi')(app, io);
  var captureModule = require(app.paths.modules + '/capture')(app, configModule, io);
  // var captureModule = require(app.paths.modules + '/fake-capture')(app, configModule, io);
  var previewModule = require(app.paths.modules + '/fake-preview')(app, configModule, io);
}

// routes
require(app.paths.config + '/routes')(app, captureModule);

var sockets = {};

io.on('connection', (socket) => {
  console.log("Connection established");
  socket.emit('connected');

  configModule.initSocket(socket);
  previewModule.initSocket(socket);
  captureModule.initSocket(socket);
  processModule.initSocket(socket);
  storageModule.initSocket(socket);
  roiModule.initSocket(socket);
  piModule.initSocket(socket);
  cropModule.initSocket(socket);
  dataModule.initSocket(socket);
  
  sockets[socket.id] = socket;
  socket.on('disconnect', function() {
    delete sockets[socket.id];
    if (Object.keys(sockets).length == 0) {
      previewModule.stopStreaming(io)
    }
  });

});

server.listen(port);
console.log('Caviconsole online at http://localhost:' + port);
exports = module.exports = app;
