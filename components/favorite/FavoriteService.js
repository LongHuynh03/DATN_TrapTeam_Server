const favoriteModel = require('./FavoriteModel');
// Lấy danh sách yêu thích
const getAllFavorites = async (page, size) => {
    try {
        return await favoriteModel.find()
        .populate("tour_id","");
    } catch (error) {
        console.log('Get all favorites servive ', error);
        throw error;
    }
};
// lấy danh sách tour yêu thích theo user_id đăng nhập
const getAllFavoritesByUserId = async (user_id) => {
    try {    
        return await favoriteModel.find({ user_id });
    } catch (error) {
      console.log("Lấy danh sách tour yêu thích theo user_id đăng nhập service: ", error);
      throw error;
    }
  }
module.exports = {
    getAllFavorites,
    getAllFavoritesByUserId
};