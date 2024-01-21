const mongoose = require("mongoose");

const config = {};

config.database = {
    mongo : function() {
        mongoose.connect(process.env.MONGO_CONNECTION_STRING)
        .then(() => console.log("MongoDB connected successfully"))
        .catch((err) => console.log(err));
    }
};



module.exports = config;

