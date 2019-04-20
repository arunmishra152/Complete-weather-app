const request = require('request');

const forcast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/cbb927dfde8f6197abdba404ff74112b/"+ latitude + "," + longitude;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect weather service!', undefined);
        } else if (body.error) {
            callback('unable to find the location', undefined);
        } else {
            callback(undefined, {
                temperature: body.currently.temperature
            })
        }
    })
}


module.exports = forcast;