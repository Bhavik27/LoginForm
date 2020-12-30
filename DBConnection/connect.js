var mssql = require("mssql");
const dbConifig = require("../Config/db");

async function executeSQL(query, req, res) {
    let DBerrors = [];
    mssql.close();
    return new Promise(function (resolve, reject) {
        mssql.connect(dbConifig, (err) => {
            if (err) {
                e = new Error(err)
                DBerrors.push({
                    msg: 'Error while connect DB',
                    errorCode: err.code,
                    errorType: e.message
                })
                req.flash('error', DBerrors)
                res.redirect('/error')
                reject(err)
            } else {
                var request = new mssql.Request();

                request.query(query, (err, result) => {
                    if (err) {
                        e = new Error(err)
                        DBerrors.push({
                            msg: 'Error while fetch Data from server',
                            errorCode: err.code,
                            errorType: e.message
                        })
                        req.flash('error', DBerrors)
                        res.redirect('/error')
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            }
        })
    })
}

module.exports = executeSQL;