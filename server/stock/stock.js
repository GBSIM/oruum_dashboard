const yahooFinance = require('yahoo-finance');

async function get_price(ticker,startDate, endDate, cb) {
    let arrClose = new Array();
    let arrDate = new Array();
    let arrOpen = new Array();
    let arrHigh = new Array();
    let arrLow = new Array();

    let priceDataset = Object();

    await yahooFinance.historical({
        symbol: ticker,
        from: startDate,
        to: endDate,
        // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
    }, function (err, quotes) {
        quotes.sort(compare_date_ascending)
        for (var key in quotes) {
            arrDate.push(get_date(quotes[key]["date"]))
            arrClose.push(quotes[key]["close"])
            arrOpen.push(quotes[key]["open"])
            arrHigh.push(quotes[key]["high"])
            arrLow.push(quotes[key]["low"])
        }
        priceDataset = {
            "date": arrDate,
            "close": arrClose,
            "open": arrOpen,
            "high": arrHigh,
            "low": arrLow
        }
    });
    // console.log(priceDataset);
    return cb(priceDataset,null)
}


function compare_date_ascending(a, b) {
    if ( a.date < b.date){
        return -1;
    }
    if ( a.date > b.date){
        return 1;
    }
    return 0;
}

function get_date(dateInput) {
    return dateInput.getFullYear() 
    + "-" + ((dateInput.getMonth() + 1) > 9 ? (dateInput.getMonth() + 1).toString() : "0" + (dateInput.getMonth() + 1))
    + "-" + (dateInput.getDate() > 9 ? dateInput.getDate().toString() : "0" + dateInput.getDate().toString());
}

module.exports = { get_price }