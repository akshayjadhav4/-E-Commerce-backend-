const express = require("express");
const router = express.Router();
const { isSignedIn } = require("../controllers/authentication");
const { getUserById } = require("../controllers/user");
const { getProductById } = require("../controllers/product");
const { addReview } = require("../controllers/review");

//params
router.param("userID", getUserById);
router.param("productID", getProductById);

//add review
router.post("/review/add/:productID/:userID", isSignedIn, addReview);

module.exports = router;
