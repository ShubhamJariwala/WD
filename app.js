var express = require('express');
var path= require('path');
var expressValidator= require('express-validator');
var session= require('express-session');
var passport= require('passport');
var localStrategy= require('passport-local').Strategy;
var bodyParser= require('body-parser');
var flash= require('connect-flash');

var routes= require('./routes/index');
var users= require('./routes/users');

var app= express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))

//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Express Session Middleware
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());

/*
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace= param.split('.'),
        root= namespace.shift(),
        formParam= root;

        while(namespace.length){
            formParam+= '[' + namespace.shift()+ ']';
        }
        return{
            param: formParam,
            msg: msg,
            value: value
        }
    }
}));
*/


//connect-Flash Middleware
app.use(flash());
app.use(function(req, res, next){
    res.locals.messages= require('express-messages')(req, res);
    next();
});

app.use('/', routes);
app.use('/users', users);

app.listen(3000);
console.log('Server started on port 3000');


