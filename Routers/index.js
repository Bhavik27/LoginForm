var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('welcome')
})

//Dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard', { user: req.user })
})

//Error
router.get('/error', (req, res) => {
    res.render('error', { user: req.user })
})

module.exports = router;