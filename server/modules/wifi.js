'use strict';
module.exports = (app, configModule) => {

  var _ = require("underscore")._
  var fs = require("fs")
  var exec = require("child_process").exec
  var wifiConfig = require('../../wifi-config.json');
  var async = require("async")

  // Underscore config
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g,
    evaluate: /\{\[([\s\S]+?)\]\}/g
  };

  var module = {}

  module.streamingProc = false

  module.writeTemplateToFile = (templatePath, fileName, config) => {
    let templateFile = fs.readFileSync(templatePath, { encoding: "utf8" })
    let template = _.template(templateFile)
    fs.writeFileSync(fileName, template(config));
  }

  module.rebootWirelessNetwork = (wlanIface, callback) => {
    async.series([
      function down(nextStep) {
        exec("sudo ifdown " + wlanIface, function (error, stdout, stderr) {
          if (!error) console.log("ifdown " + wlanIface + " successful...");
          nextStep();
        });
      },
      function up(nextStep) {
        exec("sudo ifup " + wlanIface, function (error, stdout, stderr) {
          if (!error) console.log("ifup " + wlanIface + " successful...");
          nextStep();
        });
      },
    ], callback);
  }


  // Enables the accesspoint w/ bcast_ssid. This assumes that both
  // isc-dhcp-server and hostapd are installed using:
  // $sudo npm run-script provision
  module.enableAPMode = (callback) => {


    var accessPointConfig = wifiConfig.access_point;

    accessPointConfig["enable_ap"] = true;
    accessPointConfig["wifi_driver_type"] = wifiConfig.wifi_driver_type;

    // Enable the access point ip and netmask + static
    // DHCP for the wlan0 interface
    module.writeTemplateToFile(
      "/home/pi/caviconsole/assets/etc/network/interfaces.ap.template",
      "/etc/network/interfaces",
      accessPointConfig);

    // Enable DHCP conf, set authoritative mode and subnet
    module.writeTemplateToFile(
      "/home/pi/caviconsole/assets/etc/dhcp/dhcpd.conf.template",
      "/etc/dhcp/dhcpd.conf",
      accessPointConfig);

    // Enable the interface in the dhcp server
    module.writeTemplateToFile(
      "/home/pi/caviconsole/assets/etc/default/isc-dhcp-server.template",
      "/etc/default/isc-dhcp-server",
      accessPointConfig);

    // Enable hostapd.conf file
    module.writeTemplateToFile(
      "/home/pi/caviconsole/assets/etc/hostapd/hostapd.conf.template",
      "/etc/hostapd/hostapd.conf",
      accessPointConfig);

    module.writeTemplateToFile(
      "/home/pi/caviconsole/assets/etc/default/hostapd.template",
      "/etc/default/hostapd",
      accessPointConfig);

    async.series([
      function rebootNetworkInterfaces(nextStep) {
        module.rebootWirelessNetwork(accessPointConfig.wifi_interface, nextStep);
      },
      function restartDHCPService(nextStep) {
        exec("service isc-dhcp-server restart", function (error, stdout, stderr) {
          //console.log(stdout);
          if (!error) console.log("... dhcp server restarted!");
          nextStep();
        });
      },
      function restartHostAPDService(nextStep) {
        exec("service hostapd restart", function (error, stdout, stderr) {
          //console.log(stdout);
          if (!error) console.log("... hostapd restarted!");
          nextStep();
        });
      },
    ], callback)
  }

  module.enableWifiMode = (connectionInfo, callback) => {

    // Update /etc/network/interface with correct info...
    module.writeTemplateToFile(
      "/home/pi/caviconsole/assets/etc/network/interfaces.wifi.template",
      "/etc/network/interfaces",
      connectionInfo);

    async.series([

      // Stop the DHCP server...
      function restart_dhcp_service(nextStep) {
        exec("service isc-dhcp-server stop", function (error, stdout, stderr) {
          //console.log(stdout);
          if (!error) console.log("... dhcp server stopped!");
          nextStep();
        });
      },

      function reboot_network_interfaces(nextStep) {
        module.rebootWirelessNetwork(wifiConfig.wifi_interface, nextStep);
      },

    ], callback);

  }

  return module;
};
