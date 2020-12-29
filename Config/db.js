var dbConifig = {
    user: 'admin', //enter your username
    password: 'sa@12345', //enter your password
    database: 'TestDB', //created DB name
    server: 'localhost', //enter your server name
    port: 1433,
    options: {
        encrypt: true,
        trustedConnection: true,
        enableArithAbort: true,
    }
}
module.exports = dbConifig