const router = require("express").Router();
var Transaction = require("../models/transaction.model");

router.route("/").get((req, res) => {
  Transaction.find()
    .then((transactions) => res.json(transactions))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  console.log(req.body);
  const account = req.body.account;
  const date = Date.parse(req.body.date);
  const type = req.body.type;
  const action = req.body.action;
  const symbol = req.body.symbol;
  const instrument = req.body.instrument;
  const description = req.body.description;
  const value = Number(req.body.value);
  const quantity = Number(req.body.quantity);
  const avgprice = Number(req.body.avgprice);
  const commissions = Number(req.body.commissions);
  const fees = Number(req.body.fees);
  const multiplier = Number(req.body.multiplier);
  const rootsymbol = req.body.rootsymbol;
  const underlyingsymbol = req.body.underlyingsymbol;
  const expiration = Date.parse(req.body.expiration);
  const strike = Number(req.body.strike);
  const callput = req.body.callput;
  const order = Number(req.body.order);

  const newTransaction = new Transaction({
    account,
    date,
    type,
    action,
    symbol,
    instrument,
    description,
    value,
    quantity,
    avgprice,
    commissions,
    fees,
    multiplier,
    rootsymbol,
    underlyingsymbol,
    expiration,
    strike,
    callput,
    order,
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
    transaction.instrumenttype = req.body.instrumenttype;
    transaction.description = req.body.description;
    transaction.value = Number(req.body.value);
    transaction.quantity = Number(req.body.quantity);
    transaction.averageprice = Number(req.body.averageprice);
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
