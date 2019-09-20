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
  console.log('\nLocation ....... \n');
  console.log(response.data.results[0].formatted);
  var lat = response.data.results[0].geometry.lat;
  var lng = response.data.results[0].geometry.lng;
  console.log(`Latitude : ${lat} \nLongitude : ${lng}`);

  var weatherUrl = `https://api.forecast.io/forecast/26bb4555164ebf330f6dc30713c478d8/${lat},${lng}`;

  return axios.get(weatherUrl);
}).then((response) => {

  var tempF = response.data.currently.temperature;
  var appTempF = response.data.currently.apparentTemperature;
  var precipProbability = response.data.currently.precipProbability;
  var humidity = response.data.currently.humidity;
  var windSpeed = response.data.currently.windSpeed;


  var tempC = ((tempF - 32) * 5) / 9;
  var appTempC = ((appTempF - 32) * 5) / 9;

  console.log('\nWeather ....... \n');

  console.log(`Current Temperature F* : ${tempF}`);
  console.log(`Feels like F* : ${appTempF}`);
  console.log(`Current Temperature in C* : ${tempC}`);
  console.log(`Feels like C* : ${appTempC}`);

  console.log(`precipProbability : ${precipProbability}`);
  console.log(`Humidity : ${humidity}`);
  console.log(`WindSpeed : ${windSpeed} m/s`);

});
