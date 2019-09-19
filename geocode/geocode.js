const request = require('request');

var geocodeAddress = (address, callback) => {

  var encodedAddress = encodeURIComponent(address);
  request({
    url: `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=44cda1a1d2344f2a87485a70fe5025ff`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to servers.');
    } else if (body.total_results === 0) {
      callback('Unable to find that address.');
    } else {
      callback(undefined, {
        address: body.results[0].formatted,
        latitude: body.results[0].geometry.lat,
        longitude: body.results[0].geometry.lng
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
