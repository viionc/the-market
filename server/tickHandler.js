const Listings = require("./models/listingModel");
const asyncHandler = require("express-async-handler");

let listings = [];
let interval;

const getListingsFromDatabase = asyncHandler(async () => {
    const _listings = await Listings.find();
    listings = _listings;
});
getListingsFromDatabase();

const deleteListing = asyncHandler(async (listing) => {
    await Listings.findById(listing.id).deleteOne();
});

const startTickInterval = () => {
    interval = setInterval(() => {
        listings.forEach((listing) => {
            const timerInMiliseconds = listing.durationInDays * 24 * 60 * 60 * 1000;
            const createdTimestamp = new Date(listing.createdAt).getTime();
            const endingTimestamp = createdTimestamp + timerInMiliseconds;
            const todaysTimestamp = Date.now();
            if (todaysTimestamp > endingTimestamp) {
                deleteListing(listing);
            }
        });
    }, 1000);
};
const stopTickInterval = () => {
    clearInterval(interval);
};

module.exports = {startTickInterval, stopTickInterval};
