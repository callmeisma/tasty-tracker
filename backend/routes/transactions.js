const router = require("express").Router();
var Transaction = require("../models/transaction.model");

router.route("/").get((req, res) => {
  Transaction.find()
    .then((transactions) => res.json(transactions))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").delete((req, res) => {
  Transaction.deleteMany({}, function(err, result) {
    if (err) {
      res.send('whack');
    } else {
      res.send(result);
    }
  })
});

router.route("/add").post((req, res) => {
  const account = req.body.account;
  const action = req.body.action;
  const avgprice = Number(req.body.avgprice);
  const callput = req.body.callput;
  const commissions = Number(req.body.commissions);
  const date = Date.parse(req.body.date);
  const description = req.body.description;
  const expiration = Date.parse(req.body.expiration);
  const fees = Number(req.body.fees);
  const instrument = req.body.instrument;
  const multiplier = Number(req.body.multiplier);
  const order = Number(req.body.order);
  const quantity = Number(req.body.quantity);
  const rootsymbol = req.body.rootsymbol;
  const strikeprice = Number(req.body.strikeprice);
  const symbol = req.body.symbol;
  const type = req.body.type;
  const underlyingsymbol = req.body.underlyingsymbol;
  const value = Number(req.body.value);

  const newTransaction = new Transaction({
    account,
    action,
    avgprice,
    callput,
    commissions,
    date,
    description,
    expiration,
    fees,
    instrument,
    multiplier,
    order,
    quantity,
    rootsymbol,
    strikeprice,
    symbol,
    type,
    underlyingsymbol,
    value,
  });

  newTransaction
    .save()
    .then(() => res.json("Transaction added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Transaction.findById(req.params.id)
    .then((transaction) => res.json(transaction))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Transaction.findByIdAndDelete(req.params.id)
    .then(() => res.json("Transaction deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Transaction.findById(req.params.id).then((transaction) => {
    transaction.date = Date.parse(req.body.date);
    transaction.type = req.body.type;
    transaction.action = req.body.action;
    transaction.symbol = req.body.symbol;
    transaction.instrument = req.body.instrument;
    transaction.description = req.body.description;
    transaction.value = Number(req.body.value);
    transaction.quantity = Number(req.body.quantity);
    transaction.avgprice = Number(req.body.avgprice);
    transaction.commissions = Number(req.body.commissions);
    transaction.fees = Number(req.body.fees);
    transaction.multiplier = Number(req.body.multiplier);
    transaction.rootsymbol = req.body.rootsymbol;
    transaction.underlyingsymbol = req.body.underlyingsymbol;
    transaction.expirationdate = Date.parse(req.body.expirationdate);
    transaction.strikeprice = Number(req.body.strikeprice);
    transaction.callorput = req.body.callorput;
    transaction.ordernumber = Number(req.body.ordernumber);
    transaction.account = req.body.account;

    transaction
      .save()
      .then(() => res.json("Transaction updated!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

module.exports = router;
