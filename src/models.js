const mongoose = require("mongoose");
const dbConnect = require("./utils/db");

const useSchema = mongoose.Schema({
  fullname: String,
  email: String,
  mobilenumber: String,
  uniqueId: String,
  gender: String,
  country: String,
  username: String,
  password: String,
});

const Users = dbConnect.model("Users", useSchema);
module.exports = Users;
