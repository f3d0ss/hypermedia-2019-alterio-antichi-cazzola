const express = require('express');
const router = express.Router();
const { validateBodyFunc, schemas } = require('../helpers/routeHelpers')
const { signUp } = require('../controllers/users');
const passport = require('passport');
const passportConf = require('../passport');
const User = require('../models/user');

router.post('/signup', validateBodyFunc(schemas.authSchema), signUp );
router.get('/superSecret', passport.authenticate('jwt', {session: false}), (req, res) => res.render('secretPage.ejs', { user: req.user }));

module.exports = router;