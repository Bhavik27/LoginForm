var mssql = require("mssql");
const dbConifig = require("../Config/db");

async function executeSQL(query) {
    mssql.close();
    return new Promise(function (resolve, reject) {
        mssql.connect(dbConifig, (err) => {
            if (err) {
                console.log('Error while connect DB', err);
                reject(err)
            } else {
                var request = new mssql.Request();

                request.query(query, (err, result) => {
                    if (err) {
                        console.log('Error while execute query', err);
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