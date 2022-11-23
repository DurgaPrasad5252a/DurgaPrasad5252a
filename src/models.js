// const mongoose = require("mongoose");
// const dbConnect = require("./utils/db");

// const useSchema = mongoose.Schema({
//   email: String,
//   fullname: String,
//   //age: String,
//   country: String,
//   gender: String,
//   phonenumber: String,
//   username: String,
//   password: String,
// });

// const Users = dbConnect.model("Users", useSchema);
// module.exports = Users;

const mongoose = require("mongoose");
const dbConnect = require("./utils/db");
const userSchema = mongoose.Schema({
  id: Number,
  dob: String,
  email: String,
  name: String,
  username: String,
  password: String,
  enc_password: String,
  uniqueId: String,
  gender: String,
});

const Users = dbConnect.model("Users", userSchema);
module.exports = Users;
