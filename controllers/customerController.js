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

const searchCustomer = (req, res) => {
    let searchKey = req.query.search_key
    connection.query(`select * from customers where name like '%${searchKey}%' or email like '%${searchKey}%' or phone like '%${searchKey}%' or address like '${searchKey}'`, (err, result, fields) => {
        if (!err && result) {
            res.json({
                "status": 1,
                "message": "",
                "data": result,
                "total_count": result.length,
            })
        } else {
            res.json({
                "status": 0,
                "message": "Something went wrong",
                "error": err,
            });
        }
    })
}

module.exports = {
    getCustomers,
    deleteCustomer,
    searchCustomer,
}