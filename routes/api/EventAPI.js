var express = require("express");
var router = express.Router();
const eventController = require("../../components/event/EventController");

//Lấy tất cả sự kiện
// http://localhost:3000/api/event/getAllEvents

router.get("/getAllEvents", async (req, res) => {
  try {
    const events = await eventController.getAllEvents();
    return res.status(200).json({
      result: true,
      events: events,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      events: [],
    });
  }
});

module.exports = router;
