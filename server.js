const express = require('express');
const app = express();

const cors = require('cors');

const mongoose = require('mongoose');

require('dotenv').config();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

app.use('/api', require('./routes/stocksRoute').router);

(mongoose.connect(process.env.MONGODB_URI)
    ? (console.log('db connection connected'))
    : (console.log('db connection failed'))
);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
