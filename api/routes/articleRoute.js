const express = require('express');
const { authenticateToken } = require('../middleware/authentication');
const { addArticleController, getAllArticleController, getAllPublishedArticleController, updateArticleController, deleteArticleController } = require('../controllers/articleController');
const router = express.Router();

// add article routes
router.post('/addArticle',authenticateToken,addArticleController);

// get All article routes
router.get('/getAllArticle',authenticateToken,getAllArticleController);

// get All published article routes
router.get('/getAllPublishedArticle',authenticateToken,getAllPublishedArticleController);

// Update article route
router.post('/updateArticle',authenticateToken,updateArticleController);

// Delete article route
router.delete('/deleteArticle/:id',authenticateToken,deleteArticleController)



module.exports = router;