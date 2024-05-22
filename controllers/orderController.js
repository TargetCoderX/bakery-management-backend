const { connection } = require('../database/mysql');
const getOrderOdCustomer = (req, res) => {
    let customerId = req.params.customer_id;
    let year = req.params.year;
    connection.query(`select * from orders where orders.customer_id=${customerId} and orders.year=${year}`, (err, result, fields) => {
        if (!err) {
            let data = result;
            connection.query(`select * from customers where id=${customerId}`, (err, result, fields) => {
                res.json({
                    "status": 1,
                    "message": "",
                    "data": data,
                    "customer_data": result[0],
                })
            })
        } else {
            res.json({
                "status": 0,
                "message": "Something went wrong",
                "error": err
            })
        }
    })

}
const getOrders = (req, res) => {
    connection.query("select * from orders join customers on orders.customer_id = customers.id order by orders.year desc", (err, result, fields) => {
        if (!err) {
            res.json({
                "status": 1,
                "message": "",
                "data": result,
            })
        } else {
            res.json({
                "status": 0,
                "message": "Somthing went wrong",
                "error": err,
            })
        }
    })
}

module.exports = {
    getOrders,
    getOrderOdCustomer,
}