const express = require("express");
const {
  addCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");
const { authenticateToken } = require("../middleware/authentication");
const router = express.Router();

// add new category route
router.post("/addCategory", authenticateToken, addCategoryController);

// add new category route
router.get("/getAllCategory", authenticateToken, getAllCategoryController);

// update category route
router.post("/updateCategory", authenticateToken, updateCategoryController);

// delete category route
router.delete(
  "/deleteCategory/:id",
  authenticateToken,
  deleteCategoryController
);

module.exports = router;
