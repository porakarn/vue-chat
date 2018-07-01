var express = require('express');
var router = express.Router();
var User = require('../Models/index');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const AuthPolicy = require('../Policies/AuthPolicy');
// Token setup


function generateToken(user) {
     return jwt.sign(user, 'secretkey', {
         expiresIn: Math.floor(new Date().getTime()/ 1000) + (7 * 24 * 60 * 60)
     })
}



router.post('/signup', function (req, res, next) {

    const user = new User({
        username: req.body.name,
        email: req.body.email,
        picture: req.body.picture
    });

    User.findOne({ username: req.body.name }, (err, existingUser) => {
        if (err) { return next(err); }
        // Check if email is avaible
        if (existingUser) {
            // Save error message
            // const errors = [];
            // errors.push({
            //     error: 'Email exists'
            // });

            // return res.status(400).send({ errors });
            console.log('login')
            return res.send({
                user: existingUser.toJSON(),
                token: generateToken(existingUser.toJSON())
            });
              user.update(req.body)
        }
        user.save((err) => {
            if (err) { return next(err); }
            // Registred successfully
            return res.send({
                user: user.toJSON(),
                token: generateToken(user.toJSON())
            });
        });
    });

})




/**
 * Login method
 */
router.post('/login', function (req, res, next) {
    User.findOne({ username: req.body.name }, (err, existingUser) => {
        if (err) { return next(err); }
        // Check if user exists
        const errors = [];

        // Check if email is valid
        if (!existingUser) {
            errors.push({
                error: 'User does not exist '
            });
            return res.status(400).send({ errors });
        }

        // Check if password is valid
        bcrypt.compare(req.body.password, existingUser.password, (err, response) => {
            // Something goes wrong
            if (err) {
                errors.push({
                    error: 'Something goes wrong'
                });
                return res.status(400).send({ errors });
            }
            // Successfuly logged in
            if (response) {
                return res.send({
                    user: existingUser.toJSON(),
                    token: generateToken(existingUser.toJSON())
                });
            }
            // Password is wrong
            errors.push({
                error: 'Password is incorect'
            });
            return res.status(400).send({ errors });
        });
    });

})


module.exports = router



