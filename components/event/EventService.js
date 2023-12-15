const eventModel = require("./EventModel");

// Lấy danh sách sự kiện
const getAllEvents = async (page, size) => {
  try {
    return await eventModel.find({deleted: false}).populate("province_id", "name").sort({ _id: -1 });
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
    await eventModel.findByIdAndUpdate(event_id, { deleted: true });
    return true;
  } catch (error) {
    console.log("Delete event servive error: " + error);
    throw error;
  }
}

const updateDeleted = async () => {
  const locations_id = await eventModel.find({}, {_id: 1});
  console.log(locations_id);
   try {
     return await eventModel.updateMany(
       { _id: { $in: locations_id } },
       { $set: { deleted: false } }
     );
   } catch (error) {
     console.log("Update deleted event servive ", error);
     throw error;
   }
 }

module.exports = {
  getAllEvents,
  createEvent,
  deleteEvent,
  updateDeleted 
};
