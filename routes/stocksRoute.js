const express = require('express');
const router = express.Router();

const { addStocks, getStocks, deleteStocks, updateStocks } = require('../controllers/stocksController');

router.get('/stocks', getStocks);
router.post('/stocks', addStocks);
router.put('/stocks/:id', updateStocks);
router.delete('/stocks/:id', deleteStocks);

module.exports = { router };