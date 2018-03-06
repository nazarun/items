var express = require("express");
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');
var favicon = require('serve-favicon');
var items = require('./backend/routes/items');
var validator = require('express-validator');
var async = require('async');

//Database
var mongoDB = 'mongodb://items-statistics:items-statistics@ds155278.mlab.com:55278/items-statistics';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '/frontend', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/frontend')));
app.use(validator());
app.use('/items', items);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

var port = process.env.PORT || 3000;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });

module.exports = app;