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

// Lấy danh sách tour yêu thích theo user_id đăng nhập
// http://localhost:3000/api/favorite/getAllFavoritesByUserId?user_id=
router.get("/getAllFavoritesByUserId", async (req, res) => {
    try {
      const favorites = await favoriteController.getAllFavoritesByUserId(req.query.user_id);
      return res.status(200).json({
        result: true,
        favorites: favorites,
      });
    } catch (error) {
      return res.status(500).json({
        result: false,
        favorites: null,
        message: error.message,
      });
    }
  });

module.exports = router;