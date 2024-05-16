const { seedCustomer } = require("./customerSeeder");



const executeSeeders = async () => {
    return new Promise((resolve, reject) => {
        try {
            /* seeders */
            seedCustomer();

            resolve();
        } catch (error) {
            reject(error);
        }
    })
}
executeSeeders().then(() => {
    console.log("Seeded Successfully.. Press CTRL+C to close...");

}).catch((error) => {
    console.log(error);
    return;
});