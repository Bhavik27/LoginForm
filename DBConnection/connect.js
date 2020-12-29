var sql = require("mssql");
const dbConifig = require("../Config/db");
let connPoolPromise = null;

const getConnPoolPromise = (query, res) => {
    if (connPoolPromise) return connPoolPromise;

    connPoolPromise = new Promise((resolve, reject) => {
        const pool = new sql.ConnectionPool(dbConifig);

        pool.on('close', () => {
            connPoolPromise = null;
        });

        pool.connect().then(connPool => {
            return resolve(connPool);
        }).catch(err => {
            connPoolPromise = null;
            return reject(err);
        });

    })
    return connPoolPromise;
}


module.exports.query = (sqlQuery, callback) => {

    getConnPoolPromise().then(connPool => {

        return connPool.request().query(sqlQuery);

    }).then(result => {
        callback(null, result);
    }).catch(err => {
        callback(err);
    });

};