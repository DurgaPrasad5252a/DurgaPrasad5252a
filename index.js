const {
  registerNewUser,
  loginUser,
  getAllusers,
  updateOneUser,
  getOneUser,
  deleteOneUser,
  isAuthenticated,
} = require("./src/contollers");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
const router = require("./src/router");
const dbConnect = require("./src/utils/db");

server.use(cors());
server.use(bodyParser.json());

server.use("/api", router);

server.listen(4000, () => {
  console.log("Server Started..");
});
