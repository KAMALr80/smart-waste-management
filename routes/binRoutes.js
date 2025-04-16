
const express = require("express");
const router = express.Router();
const { getAllBins, getSummary, getHistory, updateBinStatus } = require("../controllers/binController");

router.get("/", getAllBins);
router.get("/summary", getSummary);
router.get("/history", getHistory);
router.post("/update", updateBinStatus);

module.exports = router;
