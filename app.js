var express = require('express');
var expressLayout = require('express-ejs-layouts');

var app = express();

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