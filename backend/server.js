const cors = require("cors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

// Give access to variables set in .env file
require("dotenv").config();

// Create Express application
const app = express();

const port = process.env.PORT || 4000;
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(express.json());

// Mongoose
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Routes
const accountsRouter = require("./routes/accounts");
const transactionsRouter = require("./routes/transactions");
const usersRouter = require("./routes/transactions");

app.use("/accounts", accountsRouter);
app.use("/transactions", transactionsRouter);
app.use("/users", usersRouter);

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
