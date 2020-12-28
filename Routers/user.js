var express = require('express');
var router = express.Router();

//Login Page
router.get('/login', (req, res) => {
    res.send("Welcome LoginJS")
});

//Registation Page
router.get('/register', (req, res) => {
    res.send("Welcome RegisterJS")
});

module.exports = router;