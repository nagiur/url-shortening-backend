// External imports
const express = require('express');
const path = require('path');
const dotenv = require("dotenv");


// Internal imports
const config = require('./config/config');
// import routers here


// App initialization
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
app.use(express.static(path.join(__dirname, "public")));

// database connection
config.database.mongo();


// Routing setup
// app.use("/", /* loginRouter */);
// app.use("/users", /* userRouter */);

// Test Route
app.get('/test', (req, res) => {
    res.send(`Server is running on ${process.env.HOST}:${process.env.PORT}`);
});


app.init = () => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}`);
    });
};

app.init();

module.exports = app;
