const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  getPhoto,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/product");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/authentication");
const { getUserById } = require("../controllers/user");

//params
router.param("userID", getUserById);
router.param("productID", getProductById);

//create
router.post(
  "/product/create/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//read
router.get("/product/:productID", getProduct);
router.get("/product/photo/:productID", getPhoto);

//update
router.put(
  "/product/update/:productID/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//delete
router.delete(
  "/product/delete/:productID/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

//listing products
router.get("/products", getAllProducts);

module.exports = router;
