const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function signupController(req, res) {
    console.log('-----', signupController.name, '-----');

    try {
        const newUser = new User(req.body);
        await newUser.save().then(() => {
            console.log('New User Created');
            res.send('New User Created');
        });
    } catch (err) {
        res.send(err);
    }
}

async function userListCountroller(req, res) {
    console.log('-----', userListCountroller.name, '-----');
    try {
        const userList = await User.find({}).select({
            // _id: 0,
            password: 0,
            __v: 0,
            createdAt: 0,
            updatedAt: 0,
        });

        res.send({ userList });
    } catch (err) {
        res.send(err);
    }
}

async function userProfileController(req, res) {
    console.log('-----', userProfileController.name, '-----');
    console.log(req.query);

    try {
        const getUser = await User.findOne({ _id: req.query.uid }).select({
            __v: 0,
            password: 0,
        });
        res.send(getUser);
    } catch (err) {
        res.send(err);
    }
}

async function loginController(req, res) {
    console.log('-----', loginController.name, '-----');
    // console.log(req.cookies);
    // console.log(req);

    try {
        const user = await User.findOne({ email: req.body.email }).select({
            _id: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
        });
        if (user) {
            if (req.body.password === user.password) {
                // prepare the user object to generate token
                const userObject = {
                    userName: user.userName,
                    fullName: user.fullName,
                    email: user.email,
                };

                // generate token
                const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY,
                });

                // set cookie
                res.cookie(process.env.COOKIE_LOGEDIN, token, {
                    maxAge: process.env.JWT_EXPIRY,
                    httpOnly: true,
                    signed: true,
                });

                res.send('Login successfull');
            } else {
                res.send('Password not valid.Try again.');
            }
        } else {
            res.send('User not found! Sign up first.');
        }
    } catch (err) {
        res.send(err);
    }
}

async function logoutController(req, res) {
    console.log('-----', logoutController.name, '-----');
    console.log(req.cookies);

    res.clearCookie(process.env.COOKIE_LOGEDIN);

    res.send('Cookie has cleared');
}
module.exports = {
    signupController,
    userListCountroller,
    userProfileController,
    loginController,
    logoutController,
};
