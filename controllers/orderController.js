const { connection } = require('../database/mysql');
const getOrderOdCustomer = (req, res) => {
    let customerId = req.params.customer_id;
    let year = req.params.year;
    connection.query(`select * from orders join customers on customers.id=orders.customer_id where orders.customer_id=${customerId} and orders.year=${year}`, (err, result, fields) => {
        if (!err) {
            res.json({
                "status": 1,
                "message": "",
                "data": result,
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

module.exports = {
    getOrderOdCustomer,
}