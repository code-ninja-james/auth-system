const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth");
const verifyToken = require("./routes/verifyToken");

require("dotenv").config();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the auth system");
});

app.get("/api/user/profile", verifyToken, (req, res) => {
  res.send({success:true,data:req.user});
});

app.use("/api/users", authRoutes);

mongoose
  .connect(
    "mongodb+srv://j33my:PaRwgUhxbwzdV97b@passportauth.eki46.mongodb.net/auth_system?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(port, () => console.log("Server is running"));
  })
  .catch((err) => console.log(err));
