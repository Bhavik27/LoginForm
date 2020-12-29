var express = require('express');
var router = express.Router();

//Login Page
router.get('/login', (req, res) => {
    res.render('login')
});

//Registation Page
router.get('/register', (req, res) => {
    res.render('register')
});

//Register Handle
router.post('/register', (req, res) => {
    var { name, email, password, confirmPassword } = req.body
    let errors = [];

    //check for null 
    if (!name || !email || !password || !confirmPassword) {
        errors.push({ msg: 'please fill the data.' })
    }

    //check password match
    if (password !== confirmPassword) {
        errors.push({ msg: 'password and confirmPassword must be same.' })
    }

    //check password length
    if (password.length < 6) {
        errors.push({ msg: 'password must have more than 6 charactors.' })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            confirmPassword
        })
    }
    else {
        res.send('pass')
    }

})

module.exports = router;