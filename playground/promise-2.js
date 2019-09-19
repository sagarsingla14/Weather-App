const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);
    // console.log(encodedAddress);
    request({
      url: `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=44cda1a1d2344f2a87485a70fe5025ff`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to servers.');
      } else if (body.total_results === 0) {
        reject('Unable to find that address.');
      } else {
        resolve({
          address: body.results[0].formatted,
          latitude: body.results[0].geometry.lat,
          longitude: body.results[0].geometry.lng
        });
      }
    });
  });
};

geocodeAddress('Beri Khas, Haryana').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
