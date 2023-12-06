const eventService = require("./EventService");

const getAllEvents = async (page, size) => {
  try {
    return await eventService.getAllEvents(page, size);
  } catch (error) {
    console.log("Get all events controller ", error);
    throw error;
  }
};

module.exports = {
  getAllEvents,
};
