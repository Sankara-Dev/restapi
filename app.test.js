const app = require("./app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {
    it("welcomes user to the api", done => {
        chai
            .request(app)
            .get("/")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                expect(res.body.message).to.equals("Welcome To Trade API");
                done();
            });
    });
    it("get all trades", done => {
        chai
            .request(app)
            .get("/trades")
            .end((err, res) => {
                expect(res.body).to.not.equal(null);
                done();
            });
    });

   
    it("get trade by userid", done => {
        chai
            .request(app)
            .get("/trades/users/5e00b5b9f831c74024dbaa25")
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body.message).to.equals("Not Found");
                done();
            });
    });

    it("get trade by userid", done => {
        chai
            .request(app)
            .get("/trades/users/5e00b5b9f831c74024dbaa25")
            .end((err, res) => {
                expect(res.body).to.not.equal(null);
                done();
            });
    });


    it('adding new trade', function(done) {
        chai.request(app)
          .post('/trades')
          .send({
            "type": "sell",
            "user": {
                "name": "sankartest"
            },
            "symbol": "AAN",
            "shares": "12",
            "price": "200.42"
            })
          .end(function(err, res){
            expect(res).to.have.status(201);
            done();
          });
    });

    it("filter Stocks type buy", done => {
        chai
            .request(app)
            .get("/stocks/AAN/trades?type=buy&start=2019-12-23&end=2019-12-24")
            .end((err, res) => {
                expect(res.body).to.not.equal(null);
                done();
            });
    });

    it("filter Stocks type sell", done => {
        chai
            .request(app)
            .get("/stocks/AAN/trades?type=sell&start=2019-12-23&end=2019-12-24")
            .end((err, res) => {
                expect(res.body).to.not.equal(null);
                done();
            });
    });

    it("filter Stocks with error in date", done => {
        chai
            .request(app)
            .get("/stocks/AAN/trades?type=buy&start=2019&end=2019-24")
            .end((err, res) => {
                expect(res.body).to.not.equal(null);
                done();
            });
    });

    it("filter Price", done => {
        chai
            .request(app)
            .get("/stocks/AAN/price?start=2019-12-23&end=2019-12-24")
            .end((err, res) => {
                expect(res.body.symobol).to.equals("AAN");
                done();
            });
    });

    it("filter Price", done => {
        chai
            .request(app)
            .get("/stocks/AAN/price?start=2019-12-05&end=2019-12-06")
            .end((err, res) => {
                expect(res.body.message).to.equals("There are no trades in the given date range");
                done();
            });
    });

    
    it("delete all trades", done => {
        chai
            .request(app)
            .delete("/trades/erase")
            .end((err, res) => {
                expect(res.body.message).to.equals("All trades deleted");
                done();
            });
    });
});