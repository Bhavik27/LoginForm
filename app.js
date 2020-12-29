var express = require('express');
var expressLayout = require('express-ejs-layouts');
var mssql = require('mssql');
const dbConifig = require('./Config/db');

var app = express();

//DB connect
new mssql.ConnectionPool(dbConifig)
    .connect()
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err))


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