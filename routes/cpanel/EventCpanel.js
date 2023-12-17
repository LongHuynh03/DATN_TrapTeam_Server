var express = require('express');
var router = express.Router();
const eventController = require('../../components/event/EventController');
const locationController = require('../../components/location/LocationController');
const provinceController = require('../../components/province/ProvinceController');

// //Lấy danh sách event
router.get('/', async function (req, res, next) {
    try {
        const events = await eventController.getAllEvents();
        res.render('event/list', { events });
    } catch (error) {
        console.log("Get all event cpanel: ", error);
        throw error;
    }
});

// Lấy danh sách location thêm vào event
router.get('/add-event', async function (req, res, next) {
    try {
        const provinces = await provinceController.getAllProvinces();
        res.render('event/add', { provinces });
    } catch (error) {
        console.log("Get add event cpanel: ", error);
        throw error;
    }
});

// Thêm event
router.post('/add-event', async function (req, res, next) {
    try {
        let {body} = req;
        let {title, province_id, imgUrl} = body;
        await eventController.createEvent(title, province_id, imgUrl);
        res.redirect('/cpanel/events');
    } catch (error) {
        console.log("Post add event cpanel: ", error);
        throw error;
    }
});

// Xóa event
router.get('/:id/deleted', async function (req, res, next) {
  try {
    const { id } = req.params;
    await eventController.deleteEvent(id);
    return res.json({ status: true });
  } catch (error) {
    return res.json({ status: false });
  }
})

module.exports = router;