const tourModel = require("./TourModel");
const provincesModel = require("../province/ProvinceModel");

// Lấy danh sách tour

const getAllTours = async (page, size) => {
  try {
    return await tourModel
      .find()
      .populate("province_id", "")
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
      .populate("province_id", "");
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

// tìm kiếm tour theo tên

const getTourByName = async (name) => {
  try {
    return await tourModel.find({ name: { $regex: name, $options: "i" } });
  } catch (error) {
    console.log("Tìm kiếm tour theo tên service: ", error);
    throw error;
  }
};

// tìm kiếm tour theo filter
const getTourByFilter = async (
  locationProvinces,
  locationCountry,
  minPrice,
  maxPrice,
  is_popular,
  dayFind
) => {
  try {
    const tours = await tourModel.aggregate([
      {
        $lookup: {
          from: "provinces",
          localField: "province_id",
          foreignField: "_id",
          as: "province",
        },
      },
      {
        $match: {
          "province.name": { $regex: locationProvinces, $options: "i" },
          is_popular: is_popular === "true" ? true : false,
          price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
          departure_date: dayFind,
        },
      },
    ]);
    return tours;
  } catch (error) {
    console.log("Tìm kiếm tour theo filter service: ", error);
    throw error;
  }
};

// Lấy danh sách tour theo id của tỉnh

const getTourByProvinceId = async (province_id) => {
  try {
    return await tourModel.find({ province_id: province_id });
  } catch (error) {
    console.log("Lấy danh sách tour theo id của tỉnh service: ", error);
    throw error;
  }
};

// Lấy tour theo id và danh sách địa điểm của tour
const getTourByIdAndLocations = async (tour_id) => {
  try {
    return await tourModel
      .findById(tour_id)
      .populate("locations", "")
      .populate("province_id", "");
  } catch (error) {
    console.log(
      "Lấy tour theo id và danh sách địa điểm của tour service: ",
      error
    );
    throw error;
  }
};

module.exports = {
  getAllTours,
  getTourHighlight,
  getTourByLocation,
  getTourByName,
  getTourByFilter,
  getTourByProvinceId,
  getTourByIdAndLocations,
};
