const request = require('request');

const forcast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/cbb927dfde8f6197abdba404ff74112b/"+ latitude + "," + longitude;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect weather service!', undefined);
        } else if (body.error) {
            callback('unable to find the location', undefined);
        } else {
            //console.log(body.daily.data[0]);
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. the High temperature is ' + body.daily.data[0].temperatureHigh + ' with a low of '+ body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of raining.' )
               // temperature: body.currently.temperature
           
        }
    })
}


module.exports = forcast;