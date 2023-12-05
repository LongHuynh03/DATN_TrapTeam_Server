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
});

// Thêm favorite mới vào danh sách yêu thích
// http://localhost:3000/api/favorite/addNewFavorite
router.post("/addNewFavorite", async (req, res) => {
  try {
    const { user_id, tour_id } = req.body;
    const favorite = await favoriteController.addNewFavorite(user_id, tour_id);
    if (favorite) {
      return res.status(200).json({
        result: true,
        message: "Thêm favorite thành công",
      });
    }
    return res.status(400).json({
      result: false,
      message: "Thêm favorite thất bại",
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      message: error.message,
    });
  }
});

module.exports = router;
