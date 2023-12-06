const provinceService = require("./ProvinceService");

const getAllProvinces = async (page, size) => {
  try {
    return await provinceService.getAllProvinces(page, size);
  } catch (error) {
    console.log("Get all provinces controller ", error);
    throw error;
  }
};

module.exports = {
  getAllProvinces,
};
