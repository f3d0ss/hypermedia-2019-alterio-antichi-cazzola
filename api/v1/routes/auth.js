const express = require('express');
const router = express.Router();

const authController = require('../controller/auth');

router.post('/signup', authController.postSignup);
router.post('/login', authController.postLogin);
router.get('/verify-email/:userId', authController.getVerifyEmail);

module.exports = router;