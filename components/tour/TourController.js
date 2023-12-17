const tourService = require("./TourService");
// Lấy danh sách tour
const getAllTours = async (page, size) => {
  try {
    return await tourService.getAllTours(page, size);
  } catch (error) {
    console.log("Get all tours controller: ", error);
    throw error;
  }
};
// Lấy danh sách tuor nổi bật ở trang chủ
const getTourHighlight = async (page, size) => {
  try {
    return await tourService.getTourHighlight(page, size);
  } catch (error) {
    console.log("Lấy danh sách tour nổi bật controller: ", error);
    throw error;
  }
};

// lấy danh sách tour có chứa địa điểm phổ biến
const getTourByLocation = async (location_id) => {
  try {
    return await tourService.getTourByLocation(location_id);
  } catch (error) {
    console.log(
      "Lấy danh sách tour chứa địa điểm phổ biến controller: ",
      error
    );
    throw error;
  }
};

// tìm kiếm tour theo tên
const getTourByName = async (name) => {
  try {
    return await tourService.getTourByName(name);
  } catch (error) {
    console.log("Tìm kiếm tour theo tên controller: ", error);
    throw error;
  }
};

// tìm kiếm tour theo filter
const getTourByFilter = async (
  departureLocation,
  locationProvinces,
  minPrice,
  maxPrice,
  is_popular,
  dayFind
) => {
  try {
    return await tourService.getTourByFilter(
      departureLocation,
      locationProvinces,
      minPrice,
      maxPrice,
      is_popular,
      dayFind
    );
  } catch (error) {
    console.log("Tìm kiếm tour theo filter controller: ", error);
    throw error;
  }
};

// Lấy danh sách tour theo id tỉnh
const getTourByProvinceId = async (province_id) => {
  try {
    return await tourService.getTourByProvinceId(province_id);
  } catch (error) {
    console.log("Lấy danh sách tour theo id tỉnh controller: ", error);
    throw error;
  }
};

// Lấy danh sách tour theo id và địa điểm của tour
const getTourByIdAndLocations = async (tour_id) => {
  try {
    return await tourService.getTourByIdAndLocations(tour_id);
  } catch (error) {
    console.log("Lấy danh sách tour theo id và địa điểm của tour: ", error);
    throw error;
  }
};

const changeStatus = async (tour_id, status) => {
  try {
    return await tourService.changeStatus(tour_id, status);
  } catch (error) {
    console.log("Change status tour controller error: ", error);
    throw error;
  }
};

const createTour = async (
  province_id,
  name,
  description,
  available_seats,
  image,
  price,
  departure_date,
  departure_location,
  end_date,
  schedules,
  locations
) => {
  try {
    return await tourService.createTour(
      province_id,
      name,
      description,
      available_seats,
      image,
      price,
      departure_date,
      departure_location,
      end_date,
      schedules,
      locations
    );
  } catch (error) {
    console.log("Create tour controller error: ", error);
    throw error;
  }
};

// Cập nhật nổi bật tour

const popularTour = async (tour_id, is_popular) => {
  try {
    return await tourService.popularTour(tour_id, is_popular);
  } catch (error) {
    console.log("Popular tour controller error: ", error);
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
  changeStatus,
  createTour,
  popularTour,
};
