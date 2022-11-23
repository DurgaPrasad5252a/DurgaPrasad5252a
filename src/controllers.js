const uuid = require("uuid");
const CryptoJS = require("crypto-js");
const dbConnect = require("./utils/db");
const { response } = require("express");
const Users = require("./models");
var jwt = require("jsonwebtoken");
var privateKey = "prasad";

const registerNewUser = (req, res) => {
  var data = req.body;
  console.log(data);
  data.uniqueId = uuid.v4();
  var encPassword = CryptoJS.AES.encrypt(
    data.password,
    data.uniqueId
  ).toString();

  data.password = encPassword;

  var newUser = Users(data);
  newUser.save().then((response) => {
    return res.json(response);
  });
};

const getAllUsers = (req, res) => {
  Users.find().then((users) => {
    return res.json(users);
  });
};
const getOneUser = (req, res) => {
  var userId = req.query._id;
  Users.findById(userId).then((response) => {
    response.uniqueId = undefined;
    return res.json(response);
  });

  // const updateOneUser = (req, res) => {
  //   return res.json("updated");
  // };

  // console.log(userId);
  // return res.json("Data");
};

const deleteOneUser = (req, res) => {
  var userId = req.query._id;
  Users.findByIdAndDelete(userId).then((response) => {
    return res.json({ status: "Deleted", user: response });
  });
  // console.log(userId);
  // return res.json("Data");
};
const loginUser = async (req, res) => {
  var data = req.body;
  var user = await Users.findOne({ username: data.username });

  if (user === null) {
    return res.json({ status: false, msg: "You entered wrong Username" });
  }

  var decPass = CryptoJS.AES.decrypt(user.password, user.uniqueId).toString(
    CryptoJS.enc.Utf8
  );

  if (decPass !== data.password) {
    return res.json({ status: false, msg: "You entered wrong Password" });
  }

  var token = jwt.sign({ username: user.username, _id: user._id }, privateKey);

  user.uniqueId = undefined;
  user.password = undefined;

  return res.json({ status: true, data: user, token: token });
};

const isAuthenticated = async (req, res) => {
  var userToken = req.query.token;
  var user = jwt.verify(userToken, privateKey);
  if (user) {
    user = await Users.findById(user._id);
    user.password = undefined;
    user.uniqueId = undefined;
    return res.json({ status: true, data: user });
  } else {
    return res.json({ status: false });
  }
};
const forget = async (req, res) => {
  const { email } = req.body;
  res.send(email);
};

//new code for forgot
const forgotPassword = async (req, res) => {
  res.render("forgot password");
};
//post forgot-password
const { email } = req.body;
//res.send(email);
if (email !== user.email) {
  res.send("user not registered");
  return;
}

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  //res.send(req.params);
  //check id exist in db
  if (id !== user.id) {
    res.send("invalid id");
    return;
  }
  const secret = JWT_SECRET + user.password;
  try {
    const payload = jwt.verify(token, secret);
    res.render("reset-password", { email: user.email });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
//post reset-passwowrd
const { id, token } = req.params;
const { password, password2 } = req.body;
//res.send(user);
if (id !== user.id) {
  res.send("invalid id");
  return;
}
const secret = JWT_SECRET + user.password;
try {
  const payload = jwt.verify(token, secret);
  //validate password and password2 should match
  //we can simply find the user with the payload email and id
  user.password = password;
  res.send(user);
} catch (error) {
  console.log(error.message);
  res.send(error.message);
}

module.exports = {
  registerNewUser,
  isAuthenticated,
  loginUser,
  getAllUsers,
  getOneUser,
  deleteOneUser,
  forget,
  forgotPassword,
  resetPassword,
  // updateOneUser,
};
// console.log(req.body);
// req ={
//   body:{
//     "username":"syama",
//   "password":"12345",
//   "email":"g@g.com",
//   "name":"syamala"
//   },
// }

// return res.json({ status: "true" });

// const createUser = (req, res) => {

// var newUser = Users({
//   name: "Data",
//   username: "data",
//   password: "1234",
//   email: "g@gmail.com",
//   address: "ap",
// });

// newUser.save().then((response) => {
//   return res.send("User created");
// });
// };

// module.exports = {
//   users,
//   createUser,
// };
// const users = (req, res) => {
//   Users.find().then((response) => {
//     return res.json(response);
//   });
// };
