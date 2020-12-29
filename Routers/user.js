var express = require('express');
var bcrypt = require('bcrypt')
const { query } = require('../DBConnection/connect');
var router = express.Router();

//Login Page
router.get('/login', (req, res) => {
    res.render('login')
});

//Registation Page
router.get('/register', (req, res) => {
    res.render('register')
});

//Dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard', { user: req.user })
})

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
                    INSERT INTO LoginMaster 
                    (Name,Email,Password)
                    VALUES ('${name}','${email}','${password}')`;
        query(InsertQuery, (err, recordsets) => {
            if (err) return console.log(err);
            else if (recordsets.rowsAffected > 0) {
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
        var SelectQuery = `SELECT * from LoginMaster 
                            where 
                            Email = '${email}' and 
                            Password = '${password}'`;
        await query(SelectQuery, (err, recordsets) => {
            if (err) return console.log(err);
            else if (recordsets.rowsAffected > 0) {
                req.flash('successMsg', 'You are logged in')
                res.redirect('/user/dashboard')
            }
        })
    }
})

module.exports = router