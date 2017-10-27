var express = require('express');
var cors = require('cors');
var fetch = require('node-fetch');
var xml2json  = require('xml2json');

var app = express();
app.use(cors());

app.get('/', (request, response) => {
    var cbrUrl = "http://www.cbr.ru/scripts/XML_daily_eng.asp";
    cbrUrl += request.query.date ? "?date_req=" + request.query.date : ""; //"get" params we can get from request.query obj
    
    console.log("Getting data from: ", cbrUrl);
    fetch(cbrUrl)
        .then(result => {
            console.log("Data received...");
            return result.text();
        })
        .then(text => {
            response.send(xml2json.toJson(text));
        })
        .catch(error => { 
            console.log(error.message);
        })
});

app.listen(3030, function () {
    console.log('Server is running on port 3030!');
});
