const uuid = require("uuid");
var CryptoJS = require("crypto-js");
const Users = require("./models");
var jwt = require("jsonwebtoken");
const { response } = require("express");
var privatekey = "prasad";
const dbConnect = require("./utils/db");

const registerNewUser = async (req, res) => {
  var data = req.body;
  console.log(data);
  data.uniqueId = uuid.v4();
  var encPassword = CryptoJS.AES.encrypt(
    data.password,
    data.uniqueId
  ).toString();
  data.password = encPassword;
  var newUser = Users(data);
  var response = await newUser.save();
  return res.json(response);
};

const getAllusers = (req, res) => {
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
};

const updateOneUser = (req, res) => {
  var userId = req.query._id;
  var data = req.body;
  Users.findByIdAndUpdate(userId, data).then((response) => {
    return res.json({ status: "Updated", user: response });
  });
};

const deleteOneUser = (req, res) => {
  var userId = req.query._id;

  Users.findByIdAndDelete(userId).then((response) => {
    return res.json({ status: "Deleted", user: response });
  });
};

const loginUser = async (req, res) => {
  var data = req.body;
  var user = await Users.findOne({ Username: data.Username });

  if (user === null) {
    return res.json({ status: false, msg: "you entered wrong username" });
  }
  var decPass = CryptoJS.AES.decrypt(user.password, user.uniqueId).toString(
    CryptoJS.enc.Utf8
  );
  if (decPass !== data.password) {
    return res.json({ status: false, msg: "you entered wrong password" });
  }
  var token = jwt.sign({ Username: user.Username, _id: user._id }, privatekey);
  user.uniqueId = undefined;
  user.password = undefined;

  return res.json({ status: true, data: user, token: token });
};

const isAuthenticated = async (req, res) => {
  var userToken = req.query.token;
  var user = jwt.verify(userToken, privatekey);
  if (user) {
    user = await Users.findById(user._id);
    user.password = undefined;
    user.uniqueId = undefined;
    return res.json({ status: true, data: user });
  } else {
    return res.json({ status: false });
  }
};

module.exports = {
  registerNewUser,
  getAllusers,
  getOneUser,
  deleteOneUser,
  updateOneUser,
  loginUser,
  isAuthenticated,
};
