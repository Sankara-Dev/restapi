
function getTrades(req, res){
    let Trade = require('../models/trade');
    Trade.find({}, [], {sort: {'_id': 1}}, function (error, trade) {
        if (error) {
            res.send(error);
        }
        res.status(200).json(trade);
    });
}


function createTrades(req, res){
    let Trade = require('../models/trade');
    let trade = new Trade(req.body);
    trade.save();
    res.status(201).send(trade);
}


function deleteTrades(req, res){
    let Trade = require('../models/trade');
    Trade.remove( {}, (err, data) => {
        if (err) {
            res.status(500).send(err);
          return;
        }

        res.status(200).send({
            "message": "All trades deleted"
        });
    });
}


function getTradeByUser(req, res){
    const userId  = req.params.userId;
    let Trade = require('../models/trade');

    Trade.findOne({"user._id": userId}, [], {sort: {'_id': 1}}, function(err, data){
        if(err){
            res.status(404).json({
                message: "Not Found"
            });
        }else{

            if(data != null){
                res.status(200).json({
                    message: "Trade fetched successfully!",
                    trade: data
                });
            }else{
                res.status(200).json({
                    message: "No records found!"
                })
            }
        }
    });
}

module.exports.getTrades = getTrades;
module.exports.createTrades = createTrades;
module.exports.deleteTrades = deleteTrades;
module.exports.getTradeByUser = getTradeByUser;