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

const deleteCustomer = (req, res) => {
    const custmerId = req.params.customer_id;
    connection.query(`delete from customers where id=${custmerId}`, (err, result, fields) => {
        if (!err) {
            res.json({
                "status": 1,
                "message": "Customer Deleted Successfully",
            })
        } else {
            res.json({
                "status": 0,
                "message": "Something went wrong",
            })
        }
    })
}

module.exports = {
    getCustomers,
    deleteCustomer,
}