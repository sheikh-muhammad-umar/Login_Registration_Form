const express = require("express");
const cors = require("cors");
const path = require("path");
require("./database/conection");
const user = require("./routes/user");
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("Get Route...");
});

app.use("/user", user);

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}...`);
});