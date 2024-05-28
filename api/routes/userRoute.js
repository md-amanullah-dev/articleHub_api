const express = require('express');
const {  registraionController, logincontroller, getAllUserController, updateUserStatusController } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authentication');

const router = express.Router();

//  user registration route
router.post('/register',authenticateToken,registraionController);

// user login route
router.post('/login',logincontroller);

// get all user details route
router.get('/getAllUser',authenticateToken,getAllUserController)

// update user status route 
router.post('/updateUserStatus',authenticateToken,updateUserStatusController)


module.exports = router;