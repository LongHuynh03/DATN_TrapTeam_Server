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

//Thêm sự kiện
const createEvent = async (title, province_id, image) => {
  try {
    const newEvent = {
      title,
      province_id,
      image
    };
    const event = new eventModel(newEvent);
    await event.save();
    return true;
  } catch (error) {
    console.log("Create events servive ", error);
    throw error;
  }
};

//Xóa sự kiện
const deleteEvent = async (event_id) => {
  try {
    await eventModel.findByIdAndDelete(event_id);
    return true;
  } catch (error) {
    console.log("Delete event servive error: " + error);
    throw error;
  }
}

module.exports = {
  getAllEvents,
  createEvent,
  deleteEvent
};
