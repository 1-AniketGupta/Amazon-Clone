const express=require('express');
const app=express();
const bodyParser=require('body-parser');
app.listen(3000);
app.use(bodyParser.urlencoded({extended:true}));

const https=require('https');

app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post('/',function(req,res){
    const query=req.body.cityName;
    console.log(query);
    const appId="e927c362f2a32011f6e182f72be7c8cf";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appId+"&units="+unit;
    console.log(url);
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.feels_like;
            const weatherDescription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write(" <p>The Weather is currently  "+weatherDescription+ "</p>");
            res.write("<h1>The temperature in "+query+" is "+temp+" degrees Celcius.</h1>");
            res.write("<img src="+imageURL+"> ");
            res.send();
            console.log(temp); 

        })
    });
});









