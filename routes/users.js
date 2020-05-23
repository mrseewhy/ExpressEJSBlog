const express = require("express")
const router = express.Router();
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const passport = require('passport')


router.get('/login', (req, res) => {
    res.render("users/login")
})

router.post('/login', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true,
        successFlash: true
    })(req, res, next);
})

router.get('/register', (req,res)=>{
    res.render('users/register')
})

router.post('/register', (req, res) => {
    User.create(req.body, function(err, user){
        if(err){
            console.error(err)
        }else{
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(user.password, salt, function(err, hash){
                    if(err){
                        console.error(err)
                    }else{
                        user.password = hash
                    }
                })
            })
            req.flash("success", user.username + " is now registered")
            res.redirect("/users/login")
        }
    })
})

module.exports = router