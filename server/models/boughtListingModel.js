const mongoose = require("mongoose");
const boughtListingSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Listings",
    },
    boughtDate: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("BoughtListings", boughtListingSchema);
