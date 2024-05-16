const { faker } = require('@faker-js/faker');
const { connection } = require("../database/mysql");
const seedCustomer = () => {
    for (let index = 0; index < 50; index++) {
        connection.query(`insert into customers (name,phone,address,email) values('${faker.person.fullName()}','${faker.phone.number()}','${faker.location.buildingNumber()},${faker.location.city()},${faker.location.country()}','${faker.internet.email()}') `, (err, result, fields) => { })
    }
}

module.exports = {
    seedCustomer,
}