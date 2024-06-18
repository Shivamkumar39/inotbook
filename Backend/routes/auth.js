const express = require("express");
const server = express.Router();
const User = require('../Schema/User');
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const jwt_secret = 'shivamisabcd$oys'
const fetchuser = require('../middleware/fetechuser')

server.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({success, error: "Sorry, a user with this email already exists" });
        }

        const salt = await bcrypt.genSalt(5);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        const data = {
            user: {
                id: user.id
            }
        }


        const authtoken = jwt.sign(data, jwt_secret)
        success = true
        res.json({ success,
            authtoken
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});


server.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password not beblank').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let success = false
    const { email, password } = req.body

    try {

        let user = await User.findOne({ email })
        if (!user) {
            success = false
            return res.status(400).json({success, error: "please try to login correct data" })
        }

        const passwordCompasre = await bcrypt.compare(password, user.password)
        if (!passwordCompasre) {
            success = false
            return res.status(400).json({success, error: "please try to login correct password" })

        }

        const data = {
            user: {
                id: user.id
            }
        }


        const authtoken  = jwt.sign(data, jwt_secret)
        success = true
        res.json({success, authtoken })

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }


})

//get user backend to frontend


server.get('/getuser',fetchuser, async (req, res) => {



    try {

         user = req.user.id
         const user = await User.findById(user).select('-password')
      
         console.log(user);
         res.send(user)


    } catch (error) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = server;
