const favoriteService = require("./FavoriteService");

// Lấy danh sách yêu thích
const getAllFavorites = async (page, size) => {
  try {
    return await favoriteService.getAllFavorites(page, size);
  } catch (error) {
    console.log("Get all favorites controller ", error);
    throw error;
  }
};

// Thêm favorite mới vào danh sách yêu thích
const addNewFavorite = async (user_id, tour_id) => {
  try {
    return await favoriteService.addNewFavorite(user_id, tour_id);
  } catch (error) {
    console.log("Add new favorite controller ", error);
    throw error;
  }
};

module.exports = {
  getAllFavorites,
  addNewFavorite,
};
