const mongoose = require('mongoose');

const connectDB = async () => {
    try { //if try works
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb Connected:${conn.connection.host}`);
    } catch (err) {//if try fails
        console.error(`Database Connection Error: ${err.message}`);        //exit process with failure
        process.exit(1);
    }
}
//allow file export
module.exports = connectDB;