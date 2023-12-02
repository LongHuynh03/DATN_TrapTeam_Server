const eventModel = require("./EventModel");

// Lấy danh sách sự kiện
const getAllEvents = async (page, size) => {
  try {
    return await eventModel.find().populate("province_id", "name");
  } catch (error) {
    console.log("Get all events servive ", error);
    throw error;
  }
};

module.exports = {
  getAllEvents,
};
