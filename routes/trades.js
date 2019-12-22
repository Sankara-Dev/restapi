const express = require("express");
const router = express.Router();


/* Get All Trades  */
router.get("", (req, res) => {
    const { getTrades } = require('../controller/trades');
    getTrades(req, res);
});
/* End of Get All Trades */


/* Create Trades  */
router.post("", (req, res) => {
    const { createTrades } = require('../controller/trades');
    createTrades(req, res);
});
/* End of Create Trades */


/* Delete Trades  */
router.delete("/erase", (req, res) => {
    const { deleteTrades } = require('../controller/trades');
    deleteTrades(req, res);
});
/* End of Delete Trades */

/* Get Trade by User Id  */
router.get("/users/:userId", (req, res) => {
    const { getTradeByUser } = require('../controller/trades');
    getTradeByUser(req, res);
});
/* End of Get Trade by User Id */


module.exports = router;