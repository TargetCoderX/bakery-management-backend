const { seedCustomer, seedOrders, seedProducts, createUserAccount } = require("./customerSeeder");



const executeSeeders = async () => {
    return new Promise((resolve, reject) => {
        try {
            /* seeders */
            seedCustomer().then(async () => {
                await seedProducts().then(async () => {
                    await seedOrders().then(async () => {
                        await createUserAccount();
                    })
                })
            });
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