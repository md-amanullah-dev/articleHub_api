const db = require("../config/db");

// create new category controller
const addCategoryController = (req, res) => {
  try {
    const category = req.body;

    let query = "INSERT INTO category(name)VALUES(?)";
    db.query(query, [category.name], (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong!",
          error: err.message,
        });
      } else {
        res.status(200).json({
          message: "category Created successfully!",
          category: result,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error!",
      error: error.message,
    });
  }
};

// get all category controller
const getAllCategoryController = (req, res) => {
  try {
    let query = "SELECT * FROM category ORDER BY name";
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong!",
          error: err.message,
        });
      } else {
        if (result.length <= 0) {
          res.status(400).json({
            message: "category not found!",
          });
        } else {
          res.status(200).json({
            message: "Get All category!",
            category: result,
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error!",
      error: error.message,
    });
  }
};

// Update Category controller
const updateCategoryController = (req, res) => {
  try {
    const category = req.body;
    let query = "UPDATE category SET name = ? WHERE id = ? ";
    db.query(query, [category.name, category.id], (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong!",
          error: err.message,
        });
      } else {
        if (result.affectedRows == 0) {
          res.status(404).json({
            message: "Category ID does not exist!",
          });
        } else {
          res.status(200).json({
            message: "Category updated succssfully!",
            category: result,
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error!",
      error: error.message,
    });
  }
};

// Delete category Controller
const deleteCategoryController = (req, res) => {
  try {
    const categoryId = req.params.id;
    let query = "DELETE FROM category WHERE id = ?";
    db.query(query, [categoryId], (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong!",
          error: err.message,
        });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({
            message: "category ID does not found!",
          });
        } else {
          res.status(200).json({
            message: "Category deleted successully!",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error!",
      error: error.message,
    });
  }
};

module.exports = {
  addCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
