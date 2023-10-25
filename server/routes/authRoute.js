const express = require("express");
const router = express.Router();
const {registerUser, loginUser, getMe, getUserData} = require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware");

// router.get("/auth/", getListingsFromDatabase);
router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/me", protect, getMe);
router.get("/:id", getUserData);

module.exports = router;
