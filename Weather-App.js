const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    console.log(JSON.stringify(results , undefined , 3));
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      var tempF = weatherResults.temperature;
      var appTempF = weatherResults.apparentTemperature;

      var tempC = ((tempF - 32) * 5) / 9;
      var appTempC = ((appTempF - 32) * 5) / 9;

      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`Current Temperature F*: ${tempF}`);
        console.log(`Feels like F*: ${appTempF}`);
        console.log(`Current Temperature in C*: ${tempC}`);
        console.log(`Feels like C*: ${appTempC}`);
      }
    });
  }
});
