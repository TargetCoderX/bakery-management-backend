const { connection } = require("../database/mysql");

const getCustomers = (req, res) => {
    const limit = 10;
    const offset = (req.query.page - 1) * limit;
    connection.query(`SELECT * FROM customers LIMIT ${limit} OFFSET ${offset}`, (err, result, fields) => {
        connection.query("select count(*) as total from customers", (error, count, fields) => {
            res.json({
                "status": 1,
                "data": result,
                "total_count": count[0].total
            })
        });
    })
}

module.exports = {
    getCustomers,
}