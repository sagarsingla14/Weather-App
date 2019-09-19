const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=44cda1a1d2344f2a87485a70fe5025ff`;

axios.get(geocodeUrl).then((response) => {
  if (response.total_results === 0) {
    throw new Error('Unable to find that address.');
  }

  var lat = response.data.results[0].geometry.lat;
  var lng = response.data.results[0].geometry.lng;

  var weatherUrl = `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${lat},${lng}`;
  console.log(response.data.results[0].formatted);

  return axios.get(weatherUrl);
}).then((response) => {

  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);

});
