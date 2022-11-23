const {
  registerNewUser,
  loginUser,
  getAllUsers,
  getOneUser,
  deleteOneUser,
  isAuthenticated,
  forgotPassword,
  resetPassword,
} = require("./src/controllers");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
const router = require("./src/router");
const dbConnect = require("./src/utils/db");

server.use(cors());
server.use(bodyParser.json());

server.use("/api", router);

server.listen(4005, () => {
  console.log("Server Started..");
});
