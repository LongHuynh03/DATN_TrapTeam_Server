const eventService = require("./EventService");

const getAllEvents = async (page, size) => {
  try {
    return await eventService.getAllEvents(page, size);
  } catch (error) {
    console.log("Get all events controller ", error);
    throw error;
  }
};

const createEvent = async (title, province_id, image) => {
  try {
    return await eventService.createEvent(title, province_id, image);
  } catch (error) {
    console.log("Create event controller ", error);
    throw error;
  }
};

module.exports = {
  getAllEvents,
  createEvent,
};
