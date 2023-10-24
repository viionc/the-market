const express = require("express");
const router = express.Router();
const {getListingsFromDatabase, addListingToDatabase, removeListing, purchaseListing} = require("../controllers/dataController");

const {protect} = require("../middleware/authMiddleware");

router.get("/", getListingsFromDatabase);
router.post("/", protect, addListingToDatabase);
router.post("/purchase", protect, purchaseListing);
router.delete("/:id", protect, removeListing);

module.exports = router;
