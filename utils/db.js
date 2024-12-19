const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log('db connection failed')
    } catch (error) {
        console.log('db connection failed: ', error)
    }
}

module.exports =  connect ;