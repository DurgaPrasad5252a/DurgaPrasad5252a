// const express = require("express");
// const dbConnect = require("./utils/db");
// const router = express.Router();
// const {
//   registerNewUser,
//   getOneUser,
//   getAllUsers,
//   loginUser,
//   isAuthenticated,
//   deleteOneUser,
// } = require("./controllers");

// router.post("/register", registerNewUser);
// router.get("/get-one-user", getOneUser);
// router.get("/get-users", getAllUsers);
// router.post("/login", loginUser);
// router.get("/is-auth", isAuthenticated);
// router.get("/delete-user", deleteOneUser);

// module.exports = router;

///////
const express = require("express");
const dbConnect = require("./utils/db");
const router = express.Router();
const {
  registerNewUser,
  getAllUsers,
  getOneUser,
  deleteOneUser,
  isAuthenticated,
  loginUser,
  forget,
  forgotPassword,
  resetPassword,
} = require("./controllers");
router.post("/register", registerNewUser);
router.get("/is-auth", isAuthenticated);
router.post("/login", loginUser);
//router.post("/update-one-user", updateOneUser);
router.get("/get-users", getAllUsers);
router.get("/get-one-users", getOneUser);
router.get("/delete-one-users", deleteOneUser);
router.post("/forget", forget);

router.get("/forgot-password", forgotPassword);
router.post("/forgot-password", forgotPassword);
router.get("/reset-password", resetPassword);
router.post("/reset-password", resetPassword);
module.exports = router;
// const express = require("express");
// const router = express.Router();

// const { users, createUser } = require("./controllers");

// router.get("/users-create", createUser);
// router.get("/users", users);

// module.exports = router;
