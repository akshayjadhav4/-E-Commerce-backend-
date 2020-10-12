const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");
const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/authentication");
const { getToken, processPayment } = require("../controllers/payment");

router.param("userId", getUserById);

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);
router.post("/payment/:userId", isSignedIn, isAuthenticated, processPayment);

module.exports = router;
