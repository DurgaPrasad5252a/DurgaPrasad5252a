const express = require("express");
const dbConnect = require("./utils/db");
const router = express.Router();
const upload = require("./upload");
const {
  registerNewUser,
  getOneUser,
  getAllusers,
  loginUser,
  updateOneUser,

  isAuthenticated,
  deleteOneUser,
} = require("./contollers");

router.post("/register", registerNewUser);
router.get("/get-one-user", getOneUser);
router.get("/get-users", getAllusers);
router.post("/login", loginUser);
router.post("/update-user", updateOneUser);
router.get("/is-auth", isAuthenticated);
router.get("/delete-user", deleteOneUser);

module.exports = router;
