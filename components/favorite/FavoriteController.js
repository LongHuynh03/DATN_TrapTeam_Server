const favoriteService = require('./FavoriteService');

// Lấy danh sách yêu thích
const getAllFavorites = async (page, size) => {
    try {
        return await favoriteService.getAllFavorites(page, size);
    } catch (error) {
        console.log('Get all favorites controller ', error);
        throw error;
    }
};

// Lấy danh sách tour yêu thích theo user_id đăng nhập
const getAllFavoritesByUserId = async (user_id) => {
    try {
      return await favoriteService.getAllFavoritesByUserId(user_id);
    } catch (error) {
      console.log("Lấy danh sách tour yêu thích theo user_id đăng nhập controller: ", error);
      throw error;
    }
  }

module.exports = {
    getAllFavorites,
    getAllFavoritesByUserId
};