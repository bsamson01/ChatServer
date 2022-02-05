const User = require('../models/users');
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {

    console.log(req.body);

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.send({status: '200', message: 'User exists'});
    } else {
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        user.save();

        res.send(user);
    }
});

router.post('/login', async (req, res) => {

    let user = await User.findOne({ email: req.body.email });

    if (user && user.password === req.body.password) {
        res.send(user);
    } else {
        return res.status(400).send('That user does not exist!');
    }
});

router.get('/', async function (req, res) {
    let users = await User.find({});
    res.send(users);
});

module.exports = router;
