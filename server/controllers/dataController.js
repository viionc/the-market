const asyncHandler = require("express-async-handler");
const Listings = require("../models/listingModel");
//@desc Get data
//@route GET /api/listings
//@access Public
const getListingsFromDatabase = asyncHandler(async (req, res) => {
    const listings = await Listings.find();
    res.status(200).json(listings);
});

//@access Private
const getUserListings = asyncHandler(async (req, res) => {
    const listings = await Listings.find({user: req.user.id});
    res.status(200).json(listings);
});
//@desc Post data
//@route POST /api/listings
//@access Private
const addListingToDatabase = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400).json({message: "Please provide a listing"});
    }
    const newListing = await Listings.create({...req.body, sellerId: req.user.id});
    res.status(200).json(newListing);
});

const removeListing = asyncHandler(async (req, res) => {
    const listing = await Listings.findById(req.params.id);
    if (!listing) {
        res.status(404).json({message: "Listing not found"});
    }
    if (listing.user.toString() !== req.user.id) {
        res.status(401).json({message: "You are not authorized to delete this listing"});
    }
    await listing.deleteOne();
    res.status(200).json({message: "Listing deleted"});
});

module.exports = {getListingsFromDatabase, addListingToDatabase, getUserListings, removeListing};
