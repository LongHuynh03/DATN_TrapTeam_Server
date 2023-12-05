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

// Xóa favorite khỏi danh sách yêu thích theo user_id và tour_id
const deleteFavorite = async (user_id, tour_id) => {
  try {
    const favorite = await favoriteModel.findOne({
      user_id,
      tour_id,
    });
    if (!favorite) {
      return false;
    }
    await favoriteModel.deleteOne({ user_id, tour_id });
    return true;
  } catch (error) {
    console.log("Delete favorite service ", error);
    throw error;
  }
};
module.exports = {
  getAllFavorites,
  addNewFavorite,
  deleteFavorite,
};
