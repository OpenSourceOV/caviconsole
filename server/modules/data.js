'use strict';
module.exports = (app, configModule, processModule, io) => {

  var sqlite3 = require('sqlite3').verbose();
  var fs = require('fs');
  var module = {}
  var csvWriter = require('csv-write-stream')

  module.capturesDB = null
  module.initSocket = (socket) => {

    socket.on('data:db:connect', function() {
      console.log("Connecting to db");
      if(module.capturesDB) {
        io.emit('data:db:connected');
      } else {
        module.connectDB();
      }
    })

    socket.on('data:db:connect:status', function() {
      if(module.capturesDB) {
        io.emit('data:db:connect:status', true);
      } else {
        io.emit('data:db:connect:status', false);
      }
    })

    socket.on('data:reload', function() {
      module.sendAllData();
    })

    socket.on('data:export', function() {
      module.exportData();
    })

    socket.on('data:get:latest', function(lastId) {
      module.getDataSinceId(lastId);
    });

    socket.on('data:get:all', function(lastId) {
      module.sendAllData();
    });

    socket.on('data:update', function(dataItem) {
      console.log("Updating data item");
      module.updateData(dataItem);
    });

    socket.on('data:requery:areas', function() {
      module.requeryAreas();
    })
    
    socket.on('data:get:queue:summary', function() {
      module.generateQueueSummary();
    })    

  }  

  module.generateQueueSummary = () => {
    if(!module.capturesDB) {
      console.log("DB not active");
      return
    }    
    module.capturesDB.get("SELECT (SELECT COUNT(*) FROM captures) AS total, (SELECT COUNT(*) FROM captures WHERE processed = 1) as processed_total", (err, row) => {
      if(err) {
        console.log("DB error " + JSON.stringify(err));
        return;
      }
      io.emit('data:queue:summary', {
        total: (row.total - 1),
        processed: row.processed_total
      });
    });    
  }

  module.getDataSinceId = (lastId) => {
    if(!module.capturesDB) {
      console.log("DB not active");
      return
    }
    module.capturesDB.all(`SELECT rowid AS id, filename, timestamp, skip, processed, processing, area FROM captures WHERE id > ${lastId} AND processed = 1`, function(err, rows) {
      io.emit('data:db:data:latest', rows);
    });
  }

  module.requeryAreas = () => {
    // Run requery
    processModule.reprocessAreas();
    // module.sendAllData();
  }

  module.exportData = () => {
    var outputFile = configModule.getCapturePath('areas.csv')
    fs.writeFile(outputFile, '', function(){
      module.capturesDB.each("SELECT rowid AS id, filename, timestamp, skip, processed, processing, area FROM captures", function(err, row) {
        let rowValues = [row.id, row.filename, row.timestamp, row.area]
        fs.appendFile(outputFile, rowValues.join(",") + "\n");
      });    
    })
    io.emit('data:exported');  
  }

  module.sendAllData = () => {
    console.log("Sending all data");
    if(!module.capturesDB) {
      console.log("DB not active");
      return
    }
    module.capturesDB.all("SELECT rowid AS id, filename, timestamp, skip, processed, processing, area FROM captures WHERE processed = 1", function(err, rows) {
      io.emit('data:db:data:all', rows);
    });
  }

  module.updateData = (dataItem) => {
    if(!module.capturesDB) {
      console.log("DB not active");
      return
    }
    module.capturesDB.run("UPDATE captures SET area = ? WHERE id = ?", dataItem.area, dataItem.id);
    io.emit('data:updated', dataItem);
  }

  module.connectDB = () => {
    console.log("Connecting to db file...");
    if(module.capturesDB) {
      module.capturesDB.close();
      module.capturesDB = null;
    }
    let dbPath = configModule.getCapturePath('capture.db')
    if(!fs.existsSync(dbPath)) {
      io.emit('data:db:missing');
      console.log("Can't connect to DB - file doesn't exist: " + dbPath);
      return;
    }
    module.capturesDB = new sqlite3.Database(dbPath);    
    io.emit('data:db:connected');
  }

  app.eventEmitter.on('configUpdated', () => {
    module.connectDB();
  });

  return module;
};
