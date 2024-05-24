const { connection } = require("../database/mysql");

const getCustomers = (req, res) => {
    const limit = 10;
    const offset = (req.query.page - 1) * limit;
    connection.query(`SELECT * FROM customers ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`, (err, result, fields) => {
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

const addNewCustomer = (req, res) => {
    let data = req.body;
    let nameArr = data.name.split(' ');
    nameArr.forEach((element, index) => {
        nameArr[index] = element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
    });
    let name = nameArr.join(' ');
    connection.query(`insert into customers(name,email,address,phone) values('${name}','${data.email.toLowerCase()}','${data.address}','${data.phone}')`, (err, result, fields) => {
        if (!err) {
            res.json({
                "status": 1,
                "message": 'User Inserted Successfully',
            })
        } else {
            res.json({
                "status": 0,
                "message": 'Something went wrong',
            })
        }
    })
}

const getCustomerByPhone = (req, res) => {
    const phone = req.params.phone;
    connection.query(`select * from customers where phone='${phone}'`, (err, result, fields) => {
        if (!err) {
            res.json({
                'status': 1,
                'message': '',
                'data': result[0],
            })
        } else {
            res.json({
                'status': 0,
                'message': 'No user found related to this phone number',
            })
        }
    })
}

const savebillandCreateCustomer = (req, res) => {
    let data = req.body;
    let time = Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        'minute': '2-digit',
        hour12: true,
    }).format(new Date());
    let currentDate = new Date();
    let date = currentDate.getDate().toString().padStart(2, 0) + '-' + (currentDate.getMonth() + 1).toString().padStart(2, 0) + '-' + currentDate.getFullYear();
    let year = currentDate.getFullYear();
    if (!data.is_customer) {
        let customerData = data.customer_data;
        connection.query(`insert into customers(name,phone,address,email) value('${customerData.name}','${customerData.phone}','${customerData.address}','${customerData.email}')`, async (err, result) => {
            const { insertId } = await result;
            data.bill.forEach(element => {
                let sql = `insert into orders(product_name,product_id,quantity,customer_id,price,date,time,year) values('${element.product}','${element.product_id}',${element.quantity},${insertId},${element.sub_total},'${date}','${time}',${year})`
                connection.query(sql)
            });
        })
    } else {
        let customerData = data.customer_data;
        data.bill.forEach(element => {
            let sql = `insert into orders(product_name,product_id,quantity,customer_id,price,date,time,year) values('${element.product}','${element.product_id}',${element.quantity},${customerData.id},${element.sub_total},'${date}','${time}',${year})`
            connection.query(sql)
        });
    }
    res.json({
        'status': 1,
        'message': 'Bill/Order created successfully',
    })
}
module.exports = {
    getCustomers,
    deleteCustomer,
    searchCustomer,
    addNewCustomer,
    getCustomerByPhone,
    savebillandCreateCustomer,
}