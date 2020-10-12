const mongoose = require("mongoose");

var Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

var reviewSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    rating: {
      type: Number,
      default: 0,
      required: true,
    },
    author: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
