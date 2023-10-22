const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        originalPrice: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        promoPrice: {
            type: Number,
            required: true,
        },
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Listings", listingSchema);
// id: string;
// title: string;
// dateCreatedAt: string;
// originalPrice: number;
// description: string;
// image: FileList | null;
// promoPrice: number;
// sellerId: string;
