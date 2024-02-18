const express = require('express');
const {
    signupController,
    userListCountroller,
    userProfileController,
    loginController,
    logoutController,
} = require('../controllers/userController');

const { checkLogin } = require('../middlewares/checkLogin');

const userRouters = express.Router();

userRouters.post('/signup', signupController);

userRouters.post('/login', loginController);

userRouters.delete('/logout', logoutController);

userRouters.get('/user-profile/', userProfileController);
// userRouters.put('/user-update/:uid', userUpdateController);

userRouters.get('/user-list', checkLogin, userListCountroller);

module.exports = userRouters;
