const { seedCustomer, seedOrders, seedProducts } = require("./customerSeeder");



const executeSeeders = async () => {
    return new Promise((resolve, reject) => {
        try {
            /* seeders */
            seedCustomer();
            seedProducts()
            seedOrders()
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}
executeSeeders().then(() => {
    console.log("Seeded Successfully.. Press CTRL+C to close...");
    return 1;

}).catch((error) => {
    console.log(error);
    return;
});