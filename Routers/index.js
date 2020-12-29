var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('welcome')
})

//Dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard', { user: req.user })
})

module.exports = router;