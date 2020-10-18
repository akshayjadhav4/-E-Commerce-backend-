const Review = require("../models/review");
const Product = require("../models/product");

exports.addReview = (req, res) => {
  const review = new Review(req.body);
  review.save((error, reviews) => {
    if (error) {
      return res.status(400).json({
        error: "Not able to add review",
      });
    }
    Product.findOneAndUpdate(
      { _id: req.product._id },
      { $push: { reviews: review._id } },
      { new: true },
      (err, review) => {
        if (err) {
          return res.status(400).json({
            error: "Unable to save review ",
          });
        }
      }
    );
    res.json(review);
  });
};
