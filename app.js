//require a express module
const express = require("express");

//to send http request to another server
const http = require("http");

//to receive input
const bodyParser = require("body-parser");

//initialize a new express app
const app = express();

// parsing through body of the post request
app.use(bodyParser.urlencoded({ extended: true }));

//when user try to go to our homepage ("/" -- forward slace denotes root/home)
app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});



app.post("/", function (request, response) {
    
    // to get details from index.html page we have to write like : var zip = request.body.zipCode 

    //fetch data from external server
    const query = request.body.zipCode;
    const apiKey = "188e50a910f71f0c915bb37864adfcc8";
    const unit = "metric";
    const url = "http://api.openweathermap.org/data/2.5/weather?zip=" + query + ",in&appid=" + apiKey + "&units=" + unit;
    //https request   {res --- response}
    http.get(url, function (res) {
        console.log(res.statusCode);

        res.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const location = weatherData.name;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";


            response.write("<h1>The Temperature in " + location + " is " + temp + " degree celcius</h1>");
            response.write("<p>The weather is currently " + weatherDescription + " </p>");
            response.write("<img src=" + imageURL + ">");
            response.send();
        });

    });
});



























//listening on port 3000
app.listen(3000, function () {
    console.log("Server is running on Port 3000...");
});