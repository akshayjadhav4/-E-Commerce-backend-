const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((error, order) => {
      if (error) {
        return res.status(400).json({
          error: "No order found in DB",
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((error, order) => {
    if (error) {
      return res.status(400).json({
        error: "Failed to save order.",
      });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", " _id name email")
    .exec((error, orders) => {
      if (error) {
        return res.status(400).json({
          error: "No orders found.",
        });
      }
      res.json(orders);
    });
};

exports.getAllOrdersOfUser = (req, res) => {
  Order.find({ user: { _id: req.profile._id } })
    .populate("user", " _id name email")
    .exec((error, orders) => {
      if (error) {
        return res.status(400).json({
          error: "No orders found.",
        });
      }
      res.json(orders);
    });
};

exports.updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.order._id },
    { $set: { status: req.body.status } },
    (error, order) => {
      if (error) {
        return res.status(400).json({
          error: "Cannot update order status.",
        });
      }
      res.json({ message: "Order status updated." });
    }
  );
};
