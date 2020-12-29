var express = require('express');
var expressLayout = require('express-ejs-layouts');
var flash = require('connect-flash')
var session = require('express-session')

var app = express();

//session
app.use(session({
    secret: 'secretkey',
    resave: true,
    saveUninitialized: true,
}))

//Connect flash
app.use(flash())

//Access-Controls
app.use(function (req, res, next) {
    res.locals.successMsg = req.flash('successMsg');
    res.locals.errorMsg = req.flash('errorMsg');
    res.locals.error = req.flash('error');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

//Body Parser
app.use(express.urlencoded({ extended: false }))

//Get ejs
app.use(expressLayout);
app.set('view engine', 'ejs')

//Get Router
app.use('/', require('./Routers/index'));
app.use('/user', require('./Routers/user'));


var port = process.env.port || 5000

app.listen(port, () => {
    console.log(`listening on PORT : ${port}`);
})