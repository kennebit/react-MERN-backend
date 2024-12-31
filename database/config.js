const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        const ini = new Date().getTime();
        await mongoose.connect(process.env.DB_CNN, {
        });
        const end = new Date().getTime() - ini;
        console.log('DB online', { end });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    dbConnection,
}