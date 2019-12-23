const express = require("express");
const bodyParser = require("body-parser");
const tradesRoutes = require("./routes/trades");
const stocksRoutes = require("./routes/stocks");
const app = express();
var mongoose = require('mongoose');

var HOST_NAME = 'localhost';
var DATABASE_NAME = 'trade';

mongoose.connect('mongodb://' + HOST_NAME + '/' + DATABASE_NAME, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log("Connected to database!");
}).catch(() => {
    console.log("Connection failed!");
});;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


app.use("/trades", tradesRoutes);

app.use("/stocks", stocksRoutes);

app.use("/", function (req, res) {
    res.status(200).send({
        "status": "success",
        "message": "Welcome To Trade API"
    })
});


module.exports = app;
