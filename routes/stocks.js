const express = require("express");
const router = express.Router();


router.get("/:stockSymbol/trades", (req, res) => {
    var stockSymbol = req.params.stockSymbol;
    var tradeType = req.query.type;
    var startDate = req.query.start;
    var endDate = req.query.end;

    var allowedSymbols = ['AAN', 'AAP', 'ABB', 'ABM', 'ACM'];

    if (stockSymbol != '' && (tradeType == "buy" || tradeType == "sell") && startDate != ''
        && endDate != '') {
        let allowed = allowedSymbols.includes(stockSymbol);
        if (allowed) {
            const { filterStocks } = require('../controller/stocks');
            filterStocks(req, res, stockSymbol, tradeType, startDate, endDate);
        } else {
            res.status(404).send("Not Found");
        }
    } else {
        res.status(400).send("Bad Request");
    }

});


router.get("/:stockSymbol/price", (req, res) => {
    var stockSymbol = req.params.stockSymbol;
    var startDate = req.query.start;
    var endDate = req.query.end;

    var allowedSymbols = ['AAN', 'AAP', 'ABB', 'ABM', 'ACM'];

    if (stockSymbol != '' && startDate != '' && endDate != '') {
        let allowed = allowedSymbols.includes(stockSymbol);
        if (allowed) {
            const { getHighLow } = require('../controller/stocks');
            getHighLow(req, res, stockSymbol, startDate, endDate);
        } else {
            res.status(404).send("Not Found");
        }
    } else {
        res.status(400).send("Bad Request");
    }
})


module.exports = router;