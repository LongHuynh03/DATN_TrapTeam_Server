const tourModel = require("./TourModel");

// Lấy danh sách tour

const getAllTours = async (page, size) => {
  try {
    return await tourModel
      .find()
      .populate("province_id", "name")
      .populate("locations", "");
  } catch (error) {
    console.log("Get all tours servive: ", error);
    throw error;
  }
};

// lấy danh sách tuor nổi bật ở trang chủ
const getTourHighlight = async (page, size) => {
  try {
    return await tourModel
      .find({ is_popular: true })
      // "_id name price images" là các trường cần lấy ra
      .populate("province_id", "name");
  } catch (error) {
    console.log("Lấy danh sách tour nổi bật service: ", error);
    throw error;
  }
};

// lấy danh sách tour có chứa địa điểm phổ biến

const getTourByLocation = async (location_id) => {
  try {
    return await tourModel.find({ locations: { $in: [location_id] } });
  } catch (error) {
    console.log("Lấy danh sách tour chứa địa điểm phổ biến service: ", error);
    throw error;
  }
};

module.exports = {
  getAllTours,
  getTourHighlight,
  getTourByLocation,
};
