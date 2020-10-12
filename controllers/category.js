const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((error, category) => {
    if (error) {
      return res.status(400).json({
        error: "Category not found in DB"
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((error, category) => {
    if (error) {
      return res.status(400).json({
        error: "Not able to create a Category."
      });
    }
    res.json(category);
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((error, categories) => {
    if (error) {
      return res.status(400).json({
        error: "No Category Found."
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((error, updatedCategory) => {
    if (error) {
      return res.status(400).json({
        error: "Failed  to update Category."
      });
    }
    res.json(updatedCategory);
  });
};

exports.deleteCategory = (req, res) => {
  const category = req.category;
  category.remove((error, deleteCategory) => {
    if (error) {
      return res.status(400).json({
        error: "Failed  to delete Category."
      });
    }
    res.json({
      message: `Category ${deleteCategory.name} deleted successfully.`
    });
  });
};
