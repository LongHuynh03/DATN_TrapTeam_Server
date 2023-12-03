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

module.exports = {
    getAllFavorites,
};