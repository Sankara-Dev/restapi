
function filterStocks(req, res, stockSymbol, tradeType, startDate, endDate) {
    let Trade = require('../models/trade');

    Trade.find({
        symbol: stockSymbol,
        type: tradeType,
        timestamp: {
            '$gte': startDate,
            '$lte': endDate
        }
    }, [], { sort: { '_id': 1 } }, function (err, trade) {
        if (err){
            res.send(err);
        }

        res.json(trade);
    });
  
}


function getHighLow(req, res, stockSymbol, startDate, endDate) {
    let Trade = require('../models/trade');

    var maxPrice = Trade.find({
        symbol: stockSymbol,
        timestamp: {
            '$gte': startDate,
            '$lte': endDate
        }
    }, [], { sort: { 'price': -1 }, limit: 1 }).then(trade => trade[0].price);


    var minPrice = Trade.find({
        symbol: stockSymbol,
        timestamp: {
            '$gte': startDate,
            '$lte': endDate
        }
    }, [], { sort: { 'price': 1 }, limit: 1 }).then(trade => trade[0].price);


    Promise.all([maxPrice, minPrice])
        .then(result => {
            //if (result.length != 0) {
                let output = {
                    "symobol": stockSymbol,
                    "highest": result[0],
                    "lowest": result[1]
                }
                res.send(output);
           // }
        }).catch(err => {
            res.send({"message":"There are no trades in the given date range"});
        }) 
}


module.exports.filterStocks = filterStocks;
module.exports.getHighLow = getHighLow;