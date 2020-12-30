var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('welcome')
})

//Dashboard
router.get('/dashboard/:name', (req, res) => {
    res.render('dashboard', { user: req.params.name })
})

//Error
router.get('/error', (req, res) => {
    res.render('error',)
})

module.exports = router;