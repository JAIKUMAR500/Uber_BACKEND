const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const DataBaseConnect = require("./DB/Db");
const UserRoutes = require("./routes/user.routes") 


DataBaseConnect();
app.use(cors());

app.get("/", (req, res) => {
  res.send("this will run");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", UserRoutes);

UserRoutes.post("Register",(req,res)=>{


})

module.exports = app;
