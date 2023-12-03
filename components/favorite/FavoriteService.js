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
module.exports = {
    getAllFavorites,
};