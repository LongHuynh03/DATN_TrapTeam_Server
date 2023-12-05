const favoriteModel = require("./FavoriteModel");
// Lấy danh sách yêu thích
const getAllFavorites = async (page, size) => {
  try {
    return await favoriteModel.find().populate("tour_id", "");
  } catch (error) {
    console.log("Get all favorites servive ", error);
    throw error;
  }
};

// Thêm favorite mới vào danh sách yêu thích
const addNewFavorite = async (user_id, tour_id) => {
  try {
    const newFavorite = {
      user_id,
      tour_id,
    };
    const favorite = new favoriteModel(newFavorite);
    await favorite.save();
    return true;
  } catch (error) {
    console.log("Add new favorite service ", error);
    throw error;
  }
};
module.exports = {
  getAllFavorites,
  addNewFavorite,
};
