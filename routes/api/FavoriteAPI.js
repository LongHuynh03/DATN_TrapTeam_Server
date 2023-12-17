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
        favorite: favorite,
      });
    }
    return res.status(400).json({
      result: false,
      message: "Thêm favorite thất bại",
      favorite: null,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      message: error.message,
      favorite: null,
    });
  }
});

// Xóa favorite khỏi danh sách yêu thích theo user_id và tour_id
// http://localhost:3000/api/favorite/deleteFavorite

router.delete("/deleteFavorite", async (req, res) => {
  try {
    const { user_id, tour_id } = req.body;
    const favorite = await favoriteController.deleteFavorite(user_id, tour_id);
    if (favorite) {
      return res.status(200).json({
        result: true,
        message: "Xóa favorite thành công",
        data: favorite,
      });
    }
    return res.status(400).json({
      result: false,
      message: "Xóa favorite thất bại",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      message: error.message,
      data: null,
    });
  }
});

// Lấy danh sách tour yêu thích theo user_id đăng nhập
// http://localhost:3000/api/favorite/getAllFavoritesByUserId?user_id=
router.get("/getAllFavoritesByUserId", async (req, res) => {
  try {
    const favorites = await favoriteController.getAllFavoritesByUserId(
      req.query.user_id
    );
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
