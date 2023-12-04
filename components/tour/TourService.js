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
      .find({ is_popular: true }, "_id name price images")
      // "_id name price images" là các trường cần lấy ra
      .populate("province_id", "name");
  } catch (error) {
    console.log("Lấy danh sách tour nổi bật service: ", error);
    throw error;
  }
};
module.exports = {
  getAllTours,
  getTourHighlight
};
