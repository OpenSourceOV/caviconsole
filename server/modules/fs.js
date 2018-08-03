'use strict';
module.exports = (app) => {
  var path = require('path')
  var fs = require('fs');
  var module = {}
  
  module.getDirectories = (srcpath) => {
    return fs.readdirSync(srcpath).filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory()).filter(file => file !== 'SETTINGS')
  }
  
  module.getFiles = (srcpath) => {
    return fs.readdirSync(srcpath).filter(file => {
      console.log("File " + file + " , " + path.extname(file));
      return path.extname(file) == '.png';
    })
  }

  return module;
};
