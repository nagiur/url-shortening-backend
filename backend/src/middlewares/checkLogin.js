const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    console.log('--------- checkLogin ------');
    console.log('Cookies: ', cookies);

    try {
        if (cookies) {
            const token = cookies[process.env.COOKIE_LOGEDIN];
            const decoded = jwt.verify(token, process.env.JJWT_SECRET);
            console.log(token);
            console.log(decoded);

            next();
        }
    } catch {
        res.send('Authentication failure!');
    }

    console.log('--------- End checkLogin ------');
};

module.exports = { checkLogin };
