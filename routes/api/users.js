// All authentication and authorization happens 
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const nodemailer = require('nodemailer');



// load input validation 
const validateRegisterInput = require('../../validator/register'); // for register
const validateLoginInput = require('../../validator/login'); // for login
const validateEmailInput = require('../../validator/email'); // for login


// Load user model 
const User = require('../../models/User');
const Recover = require('../../models/Recover');

// @route GET api/users/test
// @desc Test users route 
// @access Public
router.get('/test', (req, res) => {
    res.json({ message: "Users works" });
});

// @route POST api/users/verify
// @desc verify user to reset password
// @access private 
router.post('/verify', (req, res) => {

    jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 900 }, (err, token) => {
            return res.json({
                success: true,
                token: 'Bearer ' + token
            });
        });
})




// @route POST api/users/recover
// @desc Recover account using email
// @access Public
router.post('/recover', (req, res) => {

    const { errors, isValid } = validateEmailInput(req.body);
    // validation check on email 
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.find({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            } else {
                // send email notification with embedded link to reset password

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: keys.email,
                        pass: keys.password
                    }
                });

                // TODO : generate token for reseting account
                const authToken = makeid(16);
                const newRecoveryRequest = new Recover({
                    userid: user[0]._id,
                    email: user[0].email,
                    authtoken: authToken

                })
                newRecoveryRequest.save()
                    .then(recover => {
                        // sucessfully inserted record 

                    }).catch(err => console.log(err));

                var mailOptions = {
                    from: 'btreravi123@gmail.com',
                    to: user[0].email,
                    subject: 'RE: Password Reset - Dev-Connector',
                    html: `
                            <h1><u>Hey there ${user[0].name}</u></h1>
                            <h2>Greeting from Dev-Connector</h2>
                            <p>
                                Please click here to reset your password
                                <a href="http://mydevconnector1428.herokuapp.com/recover/${authToken}">here</a>
                            </p>
                            <br>
                            <p >This link will expire automatically in 1 hour </p>
                    `
                };
                try {
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            return res.status(400).json(error)
                        }
                    });
                } catch (ex) {
                    return res.status(400).json({ error: ex })
                }

                // setTimeout(deleteAuthToken(user[0]._id, user[0].email), 60000)
                return res.status(200).json({ message: 'email sent' })

            }
        }).catch(err => {
            return res.status(500).json({ mesage: 'Internal server' })
        })
})


// @route POST api/users/register
// @desc Register users route 
// @access Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // check validation 
    if (!isValid) {
        return res.status(400).json(errors);
    }



    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    email: 'Email already exists'
                })
            } else {
                // create new user if not exists
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // size
                    e: 'pg',  // Rating
                    d: 'mm', // Default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.json(user);
                            }).catch(err => console.log(err));
                    });
                })
            }
        });
});


// @route POST api/users/login
// @desc Login users route 
// @access Public
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    // check validation 
    if (!isValid) {
        return res.status(400).json(errors);
    }


    const email = req.body.email;
    const password = req.body.password;

    // find user by email 
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ email: 'user does not exists' });
        }

        // check password 
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {

                    // user matched
                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    };

                    // sign token
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        { expiresIn: 3600 }, (err, token) => {
                            return res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });

                } else {
                    return res.status(400).json({ password: 'wrong password' });
                }
            });
    })

})



// @route POST api/users/current
// @desc current users route 
// @access Public
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        msg: 'success',
        user: {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            avatar: req.user.avatar,
            date: req.user.date
        }
    });
});



module.exports = router;

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
