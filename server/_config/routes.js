module.exports = function(app, captureModule) {

  app.get('/captured-image/:name', function(req, res) {
    let imageFile = captureModule.getCaptureImagePath(req.params["name"]);
    console.log("Sending file..." + imageFile);
    res.sendfile(imageFile);
  });

  app.get('/processed-image/:name', function(req, res) {
    let imageFile = captureModule.getProcessedImagePath(req.params["name"]);
    console.log("Sending file..." + imageFile);
    res.sendfile(imageFile);
  });

  app.get('/capture/preview', function(req, res) {
    res.sendfile(captureModule.getCaptureImagePath("preview.png"));
  });

  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('/', function(req, res) {
    res.sendfile('./public/dist/index.html'); // load our public/index.html file
  });

  app.get('*', function(req, res) {
    res.redirect('/');  
  });

};
