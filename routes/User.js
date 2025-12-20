const express = require("express")
const router = express.Router()
const {signUp,signIn} = require('../controllers/User')

//Post >> Sign up
router.post('/signup',signUp)

//Post >> Sign in
router.post('/signin',signIn)

module.exports = router;

