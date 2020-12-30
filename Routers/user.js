var express = require('express');
var bcrypt = require('bcrypt')
const executeSQL = require('../DBConnection/connect');
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
    var flag = 0

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
        var InsertQuery = `IF NOT EXISTS (select * from LoginMaster where Email = '${email}')
                    INSERT INTO LoginMaster (Name,Email,Password) VALUES ('${name}','${email}','${password}')`;

        executeSQL(InsertQuery, req, res)
            .then((result) => {
                if (result.rowsAffected > 0) {
                    req.flash('successMsg', 'You are registered')
                    res.redirect('/user/login')
                }
                else {
                    errors.push({ msg: 'mailId already exist' })
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        confirmPassword
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
})



router.post('/login', async (req, res) => {
    var { email, password } = req.body
    let errors = [];

    //check for null 
    if (!email || !password) {
        errors.push({ msg: 'please fill the data.' })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            email,
            password
        })
    }
    else {
        var SelectQuery = `SELECT * from LoginMaster  where Email = '${email}' and Password = '${password}'`;

        executeSQL(SelectQuery, req, res)
            .then((result) => {
                if (result.rowsAffected > 0) {
                    req.flash('successMsg', 'You are logged in')
                    res.redirect('/dashboard')
                }
                else {
                    errors.push({ msg: 'emailId or password incorrect' });
                    res.render('login', {
                        errors,
                        email,
                        password
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
})

module.exports = router