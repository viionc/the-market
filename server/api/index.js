const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("../config/db");
const {startTickInterval, stopTickInterval} = require("../tickHandler");

connectDB();
startTickInterval();

const whitelist = ["https://the-market-beryl.vercel.app/", "http://localhost:5173/"];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use("/api/listings", require("../routes/dataRoute"));
app.use("/api/auth", require("../routes/authRoute"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
