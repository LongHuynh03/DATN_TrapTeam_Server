var express = require("express");
var router = express.Router();

const favoriteController = require("../../components/favorite/FavoriteController");

// Lấy tất cả favorite
// http://localhost:3000/api/favorite/getAllFavorites

router.get("/getAllFavorites", async (req, res) => {
    try {
        const favorites = await favoriteController.getAllFavorites();
        return res.status(200).json({
            result: true,
            favorites: favorites,
        });
    } catch (error) {
        return res.status(500).json({
            result: false,
            favorites: [],
        });
    }
}
);

// Lấy favorite theo id
module.exports = router;