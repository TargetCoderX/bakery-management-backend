const { connection } = require('../database/mysql')

const getAllProducts = (req, res) => {
    connection.query("select * from products", (err, result, fields) => {
        if (!err) {
            res.json({
                'status': 1,
                'message': '',
                'data': result,
            })
        } else {
            res.json({
                'status': 0,
                'message': 'Something went wrong'
            })
        }
    })
}

module.exports = {
    getAllProducts,
}