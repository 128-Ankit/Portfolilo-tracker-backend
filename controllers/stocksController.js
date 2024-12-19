const Stock = require('../models/stocksModel');
const axios = require('axios');

// Add new stock
const addStocks = async (req, res) => {
    try {
        const { ticker, name, quantity, buyPrice } = req.body;

        if (!ticker || !name || !quantity || !buyPrice) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        const stock = new Stock({ ticker, name, quantity, buyPrice });

        // Fetch current price
        const priceResponse = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=YERVIMI91WUNG6YO`);
        stock.currentPrice = priceResponse.data['Global Quote']['05. price'];

        await stock.save();
        res.status(201).json(stock);
    } catch (error) {
        res.status(500).json({ message: "error while adding stocks " + error.message });
    }
};

// Get all stocks
const getStocks = async (req, res) => {
    try {
        const stocks = await Stock.find();
        if (!stocks) {
            return res.status(404).json({ message: "No stocks found" });
        }
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete stocks
const deleteStocks = async (req, res) => {
    try {
        await Stock.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Stock deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update stocks
const updateStocks = async (req, res) => {
    try {
        const stockId = req.params.id
        const { ticker, name, quantity, buyPrice } = req.body;
        if (!stockId) {
            return res.status(400).json({
                message: "No stock found!"
            });
        }
        const stock = await Stock.findByIdAndUpdate(stockId, { ticker, name, quantity, buyPrice }, {new: true});
        console.log("stock: ",stock)
        res.status(200).json({
            message: 'Stock updated successfully',
            stock
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { addStocks, getStocks, updateStocks, deleteStocks };