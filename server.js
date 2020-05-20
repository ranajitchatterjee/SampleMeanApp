// Requiring necessary npm middleware packages 
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");
// Setting up port
var PORT = process.env.PORT || 3000;
//Import the models folder
var db = require("./models");

// Creating express app and configuring middleware 
//needed to read through our public folder
var app = express();
app.use(bodyParser.urlencoded({
    extended: false
})); //for body parser
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


//get to test - not required for the time being
/* app.get('/', function (req, res) {
    res.send('Welcome to Passport with Sequelize and without HandleBars');
}); */

// Requiring our routes
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

db.sequelize.sync().then(function () {
    //listening on port
    app.listen(PORT, function () {
        console.log('App listening on PORT - ' + PORT);
    });
});