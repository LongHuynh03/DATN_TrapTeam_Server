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

const deleteEvent = async (event_id) => {
  try {
    return await eventService.deleteEvent(event_id);
  } catch (error) {
    console.log("Delete event controller error: "+ error);
    throw error;
  }
};

const updateDeleted = async () => {
  try {
    return await eventService.updateDeleted();
  } catch (error) {
    console.log("Update deleted event controller ", error);
    throw error;
  }
}

module.exports = {
  getAllEvents,
  createEvent,
  deleteEvent,
  updateDeleted
};
