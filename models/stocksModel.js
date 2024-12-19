const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    buyPrice: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number
    },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Stock', StockSchema);