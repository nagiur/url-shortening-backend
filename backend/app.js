// External imports
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Internal imports
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const userRouters = require('./src/routes/userRoutes');

// App initialization
const app = express();

// Middleware setup
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.COOKIE_SECRET));

// database connection
config.database.mongo();

// Routing setup
app.use('/api', userRouters);

// Test Route
app.get('/test', (req, res) => {
    res.send(`Server is running on ${process.env.HOST}:${process.env.PORT}`);
});

// Defult error handler
app.use((err, req, res, next) => {
    if (res.headersSent) {
        next('There was a problem!');
    } else if (err.message) {
        res.status(500).send(err.message);
    } else {
        res.status(500).send('There was an error!');
    }
});

app.init = () => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}`);
    });
};

app.init();

module.exports = app;
