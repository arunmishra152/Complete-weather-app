const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');
const request = require('request');
const port = process.env.PORT || 3000

console.log(__dirname);
console.log(__filename);

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));
app.get('',(req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Arun Mishra'
    });
});
app.get('/about',(req,res)=>{
    res.render('about',{
        about: 'About',
        title: 'Weather App',
        name: 'Arun Mishra'
    });
});
app.get('/help',(req,res)=>{
    res.render('help',{
        number: '9839170076',
        title: 'Weather App',
        name: 'Arun Mishra'
    });
})
app.get('/weather',(req,res)=>{
    let address = req.query.address;
    if(!address){
        return res.send({
            error: "You must provide an address"
        });
    }
    geocode(address, (error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send(error);
        }
        forcast(latitude, longitude, (error, forcastData)=>{
            console.log('forcast-->',forcastData);
            if(error){
              return  res.send(error);
            }
            res.send({
                latitude: latitude,
                location,
                address: address,
                forcast: forcastData
            })
        })
       
    })
});

app.get('/help/*',(req,res)=>{
    res.render('error', {
        title: 'Help error',
        name: 'Arun Mishra',
        errormessage: 'Help Articale Not Found'
    });
})

app.get('*',(req,res)=>{
    res.render('error', {
        title: 'error page',
        name: 'Arun Mishra',
        errormessage: 'Page Not Found'
    });
})

app.listen(port,()=>{
    console.log('server is strated on port ' + port);
})