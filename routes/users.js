var express= require('express');
var router= express.Router();
var mongojs= require('mongojs');
var db= mongojs('passportapp', ['users']);
var bcrypt= require('bcryptjs');
var passport= require('passport');
var LocalStrategy= require('passport-local').Strategy;

//Login Page - GET
router.get('/login', function(req, res){
    res.render('login');
});

//Register Page - GET
router.get('/register', function(req, res){
    res.render('register');
});

//Register - POST
router.post('/register', function(req, res){
    
    var username= req.body.username;
    var email= req.body.email;
    var password= req.body.password;
    var confirmpassword= req.body.confirmpassword;

    req.checkBody('username', 'Username field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Please enter a valid email address').isEmail();
    req.checkBody('password', 'Password is requires').notEmpty();
    req.checkBody('confirmpassword', 'Passwords dont match').equals(req.body.password)

    var errors= req.ValidationErrors();
    
    if(errors){
        res.render('register', {
            errors: errors,
            username: username,
            email: email,
            password: password,
            password2: password2
        });
    }
    else{
        console.log('SUCCESS');
        console.log('Adding User');

    }

    


    







});

module.exports= router;