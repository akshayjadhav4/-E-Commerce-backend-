const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  getAllUsers,
  updateUser,
  userPurchaseList,
} = require("../controllers/user");

const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/authentication");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.get(
  "/user/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllUsers
);

router.put("/user/update/:userId", isSignedIn, isAuthenticated, updateUser);

router.get(
  "/user/orders/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
