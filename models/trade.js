var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, required: true }
});

var TradeSchema = new Schema({
	type: { type: String, required: true },
	user: [UserSchema],
    symbol: { type: String, required: true },
    shares: { type: String, required: true },
    price: { type: String, required: true },
    timestamp: { type : Date, default: Date.now }
});


module.exports = mongoose.model('Trade', TradeSchema);