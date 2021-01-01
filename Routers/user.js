var express = require('express');
const executeSQL = require('../DBConnection/connect');
const crypto = require('crypto');
const { json } = require('express');

var router = express.Router();
const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = new Buffer.alloc(16, '674587bea5543f149713a785b7e4233d', 'binary');
const output_encoding = 'hex';
const input_encoding = 'utf-8';

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
                    INSERT INTO LoginMaster (Name,Email,Password) VALUES ('${name}','${email}','${encrypt(password)}')`;
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
        var SelectQuery = `SELECT * from LoginMaster  where Email = '${email}' and Password = '${encrypt(password)}'`;

        executeSQL(SelectQuery, req, res)
            .then((result) => {
                if (result.rowsAffected > 0) {
                    req.flash('successMsg', 'You are logged in')
                    res.redirect('/dashboard/' + result.recordset[0].Name)
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


function encrypt(data) {
    var cipher = crypto.createCipheriv(algorithm, secretKey, iv)
    var cipherText = cipher.update(JSON.stringify(data), input_encoding, output_encoding) + cipher.final(output_encoding)
    return cipherText
}

module.exports = router