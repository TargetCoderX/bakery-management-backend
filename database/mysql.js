var mysql = require('mysql2');
require('dotenv').config();
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
// const mysqlConnection = connection.connect((err) => {
//     if (err) throw err;
//     // console.log("Database Connected");
// });

module.exports = {
    connection,
}