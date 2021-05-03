const mongoose = require("mongoose");
const config = require("../config");

mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
    console.log("Database connection successful.");
});
mongoose.connection.on("error", (error) => {
    console.log(`Database connection error: ${error}`);
});

module.exports = mongoose;