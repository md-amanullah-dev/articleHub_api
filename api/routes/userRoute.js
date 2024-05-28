const express = require('express');
const {  registraionController, logincontroller } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authentication');

const router = express.Router();

//  user registration route
router.post('/register',authenticateToken,registraionController);

// user login route
router.post('/login',logincontroller);


module.exports = router;