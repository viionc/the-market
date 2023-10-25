const express = require("express");
const router = express.Router();
const {
    getListingsFromDatabase,
    addListingToDatabase,
    removeListing,
    purchaseListing,
    getSellerListingsByUserId,
} = require("../controllers/dataController");

const {protect} = require("../middleware/authMiddleware");

router.get("/", getListingsFromDatabase);
router.get("/:id", getSellerListingsByUserId);
router.post("/", protect, addListingToDatabase);
router.post("/purchase", protect, purchaseListing);
router.delete("/remove/:id", protect, removeListing);

module.exports = router;
