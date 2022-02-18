const router = require("express").Router();
var Account = require("../models/account.model");

router.route("/").get((req, res) => {
  Account.find()
    .then((accounts) => res.json(accounts))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const account = req.body.account;
  const startingBalance = req.body.startingBalance;

  const newAccount = new Account({
    account,
    startingBalance,
  });

  newAccount
    .save()
    .then(() => res.json("Account added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Account.findById(req.params.id)
    .then((account) => res.json(account))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Account.findByIdAndDelete(req.params.id)
    .then(() => res.json("Transaction deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Account.findById(req.params.id).then((account) => {
    account.account = req.body.account;
    account.startingBalance = req.body.startingBalance;

    account
      .save()
      .then(() => res.json("Account updated!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

module.exports = router;
