const locationModel = require("./LocationModel");

// Lấy danh sách địa điểm
const getAllLocations = async (page, size) => {
  try {
    return await locationModel.find().populate("province_id", "name");
  } catch (error) {
    console.log("Get all locations servive ", error);
    throw error;
  }
};

//Thêm đại điểm mới
const createLocation = async (name, province_id, description, image, is_popular) => {
  try {
    const newLocaion = {
      name,
      province_id,
      description,
      image,
      is_popular
    };
    const location = new locationModel(newLocaion);
    await location.save();
    return true;
  } catch (error) {
    console.log("Create locations servive ", error);
    throw error;
  }
}

//Xóa địa điểm
const deleteLocation = async (location_id) => {
  try {
    await locationModel.findByIdAndDelete(location_id);
    return true;
  } catch (error) {
    console.log("Delete locations servive ", error);
    throw error;
  }
}

//Lấy địa điểm theo id
const getLocation = async (location_id) => {
  try {
    let location = await locationModel.findById(location_id)
      .populate("province_id", "name");
    return location;
  } catch (error) {
    console.log("Get location servive ", error);
    throw error;
  }
}

//Cập nhật địa điểm nổi bật
const popularLocation = async (location_id, is_popular) => {
  try {
    const location = await locationModel.findById(location_id);
    if (location) {
      location.is_popular = is_popular ? is_popular : location.is_popular;
      await location.save();
      return true;
    }
    return false;
  } catch (error) {
    console.log("Popular locations servive ", error);
    throw error;
  }
}

module.exports = {
  getAllLocations,
  createLocation,
  deleteLocation,
  getLocation,
  popularLocation,
};
