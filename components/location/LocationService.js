const locationModel = require("./LocationModel");

// Lấy danh sách địa điểm nổi bật
const getAllLocations = async (page, size) => {
  try {
    return await locationModel
      .find({ is_popular: true })
      .populate("province_id", "").
      sort({ _id: -1 });
  } catch (error) {
    console.log("Get all locations servive ", error);
    throw error;
  }
};

const getAllLocations_web = async (page, size) => {
  try {
    return await locationModel
      .find()
      .populate("province_id", "").
      sort({ _id: -1 });
  } catch (error) {
    console.log("Get all locations servive ", error);
    throw error;
  }
};


// Lấy địa điểm theo id
const getLocationById = async (location_id) => {
  try {
    return await locationModel
      .findById(location_id)
      .populate("province_id", "");
  } catch (error) {
    console.log("Get location by id servive ", error);
    throw error;
  }
};

// Lấy địa điểm theo province_id
const getLocationByProvinceId = async (province_id) => {
  try {
    return await locationModel
      .find({ province_id: province_id })
      .populate("province_id", "");
  } catch (error) {
    console.log("Get location by province id servive ", error);
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

//Cập nhật địa điểm nổi bật
const popularLocation = async (location_id, is_popular) => {
  try {
    const popular = is_popular == 'true' ? false : true;
    console.log(popular);
    const location = await locationModel.findByIdAndUpdate(location_id, { is_popular: popular});
    if (location) {
      return true;
    }
    return false;
  } catch (error) {
    console.log("Popular locations servive ", error);
    throw error;
  }
}

const deleteLocation = async (location_id) => {
  try {
    await locationModel.findByIdAndDelete(location_id);
    return true;
  } catch (error) {
    console.log("Delete locations servive ", error);
    throw error;
  }
}

module.exports = {
  getAllLocations,
  getLocationById,
  getLocationByProvinceId,
  createLocation,
  getAllLocations_web,
  popularLocation, 
  deleteLocation
};
