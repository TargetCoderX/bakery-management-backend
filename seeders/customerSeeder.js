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
            let generateCount = Math.floor(Math.random() * 50) + 1;
            for (let index = 0; index < generateCount; index++) {
                let customerId = element.id;
                let getProduct = products[Math.floor(Math.random() * products.length)];
                let time = Intl.DateTimeFormat('en-US', {
                    hour: '2-digit',
                    'minute': '2-digit',
                    hour12: true,
                }).format(new Date());
                let fakeDate = faker.date.between({ from: '2020-01-01', to: '2024-12-31' });
                let date = fakeDate.getDate().toString().padStart(2, 0) + '-' + (fakeDate.getMonth()+1).toString().padStart(2, 0) + '-' + fakeDate.getFullYear();
                let year = fakeDate.getFullYear();
                connection.query(`insert into orders(product_name,product_id,customer_id,price,date,year,time) values('${getProduct.name}','${getProduct.id}',${customerId},${getProduct.price},'${date}','${year}','${time}')`)
            }
        });
    })
}

module.exports = {
    seedCustomer,
    seedProducts,
    seedOrders,
}