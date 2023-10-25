const asyncHandler = require("express-async-handler");
const Listings = require("../models/listingModel");
const Users = require("../models/userModel");
const BoughtListings = require("../models/boughtListingModel");
//@desc Get data
//@route GET /api/listings
//@access Public
const getListingsFromDatabase = asyncHandler(async (req, res) => {
    let listings = await Listings.find();
    if (!listings) listings = [];
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

const getSellerListingsByUserId = asyncHandler(async (req, res) => {
    const {id} = req.params;
    if (!id) {
        res.status(400).json({message: "Please provide a listing id."});
    }
    const user = await Users.findById(id);
    console.log(user);
    if (!user) {
        res.status(400).json({message: "Couldn't find user with that id."});
    }
    const sellerListings = await Listings.find({sellerId: id});
    res.status(200).json({username: user.username, listings: sellerListings});
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

//@desc Buy Listing
//@route POST /api/listings
//@access Private
const purchaseListing = asyncHandler(async (req, res) => {
    const {buyerId, listingId} = req.body;
    if (!buyerId || !listingId) {
        res.status(400).json({message: "Missing buyerId or listingId."});
    }
    const listing = await Listings.findById(listingId);
    if (!listing) {
        res.status(404).json({message: "Listing not found"});
    }
    await BoughtListings.create({sellerId: listing.sellerId, buyerId: buyerId, boughtDate: new Date(), itemId: listingId});
    await listing.deleteOne();
    res.status(200).send("Succesfuly bought the item.");
});

module.exports = {getListingsFromDatabase, addListingToDatabase, getUserListings, removeListing, purchaseListing, getSellerListingsByUserId};
