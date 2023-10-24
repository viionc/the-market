const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const {startTickInterval, stopTickInterval} = require("./tickHandler");

connectDB();

startTickInterval();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/listings", require("./routes/dataRoute"));
app.use("/api/auth", require("./routes/usersRoute"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
