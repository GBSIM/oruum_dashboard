const port = 4000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { get_price } = require('./stock/stock')

app.use(bodyParser.json());;
  
app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
});

app.post('/api/stock/price', (req,res) => {
    console.log('stock price requested...',
                '|| ticker: ',req.body.ticker,
                '|| start date: ', req.body.startDate,
                '|| end date: ', req.body.endDate)
    get_price(req.body.ticker, req.body.startDate, req.body.endDate, (priceStock, err) => {
        console.log("stock price collected!")
        // console.log(priceStock);
        if (err) {
            console.log('collecting stock price failed')
        }
        return res.status(200).json({
            "date": priceStock.date,
            "close": priceStock.close,
            "open": priceStock.open,
            "high": priceStock.high,
            "low": priceStock.low})
    })
});