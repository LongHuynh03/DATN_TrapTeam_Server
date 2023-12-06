const provinceModel = require("./ProvinceModel");

//Lấy danh sách tỉnh thành
const getAllProvinces = async (page, size) => {
  try {
    return await provinceModel.find();
  } catch (error) {
    console.log("Get all provinces servive ", error);
    throw error;
  }
};

module.exports = {
  getAllProvinces,
};
