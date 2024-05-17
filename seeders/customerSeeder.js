const { faker } = require('@faker-js/faker');
const { connection } = require("../database/mysql");
const bakeryProducts = [
    'Bread',
    'Baguette',
    'Croissant',
    'Bagel',
    'Muffin',
    'Scone',
    'Doughnut',
    'Danish pastry',
    'Brioche',
    'Ciabatta',
    'Focaccia',
    'Cupcake',
    'Tart',
    'Eclair',
    'Macaron',
    'Pie',
    'Cinnamon roll',
    'Pretzel',
    'Brownie',
    'Cake'
];


/* seed customers */
const seedCustomer = () => {
    for (let index = 0; index < 50; index++) {
        connection.query(`insert into customers (name,phone,address,email) values('${faker.person.fullName()}','${faker.phone.number()}','${faker.location.buildingNumber()},${faker.location.city()},${faker.location.country()}','${faker.internet.email()}') `, (err, result, fields) => { })
    }
}
const seedProducts = () => {
    for (let index = 0; index < bakeryProducts.length; index++) {
        connection.query(`insert into products(name,code,price) values('${bakeryProducts[index]}','${bakeryProducts[index].substring(0, 2).toLowerCase()}',${faker.number.int({ min: 100, max: 1000 })})`)
    }
}

const seedOrders = () => {
    var products = [];
    connection.query("select * from products", (err, result, fields) => { products = result })
    connection.query("select id from customers", (err, result, fields) => {
        result.forEach(element => {
            let generateCount = Math.floor(Math.random() * 20) + 1;
            for (let index = 0; index < generateCount; index++) {
                let customerId = element.id;
                let getProduct = products[Math.floor(Math.random() * products.length)];
                let date = new Intl.DateTimeFormat('en-US', {
                    timeZone: 'Asia/Kolkata',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).format(new Date);
                let time = Intl.DateTimeFormat('en-US', {
                    hour: '2-digit',
                    'minute': '2-digit',
                    hour12: true,
                }).format(new Date());
                connection.query(`insert into orders(product_name,product_id,customer_id,price,date,time) values('${getProduct.name}','${getProduct.id}',${customerId},${getProduct.price},'${date}','${time}')`)
            }
        });
    })
}

module.exports = {
    seedCustomer,
    seedProducts,
    seedOrders,
}