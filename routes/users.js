const express = require('express');
const router = express.Router();
const {
    validateBodyFunc,
    schemas
} = require('../helpers/routeHelpers')
const userController = require('../controllers/users');
const passport = require('passport');

router.post('/signup', validateBodyFunc(schemas.authSchema), userController.signUp);

router.get('/superSecret', passport.authenticate('jwt', {
    session: false
}), userController.getSuperSecret);

module.exports = router;