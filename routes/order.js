const express = require("express");
const router = express.Router();

const {
  getOrderById,
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getAllOrdersOfUser,
} = require("../controllers/order");
const { updateStock } = require("../controllers/product");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/authentication");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");

//params
router.param("userID", getUserById);
router.param("orderID", getOrderById);

//create
router.post(
  "/order/create/:userID",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

//read
router.get(
  "/order/all/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

router.get("/orders/:userID", isSignedIn, isAuthenticated, getAllOrdersOfUser);

router.put(
  "/order/status/:orderID/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateOrderStatus
);

module.exports = router;
