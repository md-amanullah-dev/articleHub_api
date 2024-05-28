const express = require('express');
const {  registraionController, logincontroller } = require('../controllers/userController');

const router = express.Router();

//  user registration route
router.post('/register',registraionController);

// user login route
router.post('/login',logincontroller);

module.exports = router;