var express = require("express");
var router = express.Router();

const reviewController = require("../../components/review/ReviewController");
// Lấy tất cả review
// http://localhost:3000/api/review/getAllReviews

router.get("/getAllReviews", async (req, res) => {
    try {
        const reviews = await reviewController.getAllReviews();
        return res.status(200).json({
            result: true,
            reviews: reviews,
        });
    } catch (error) {
        return res.status(500).json({
            result: false,
            reviews: [],
        });
    }
});

module.exports = router;