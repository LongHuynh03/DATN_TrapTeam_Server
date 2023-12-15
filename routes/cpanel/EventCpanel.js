var express = require('express');
var router = express.Router();
const eventController = require('../../components/event/EventController');
const locationController = require('../../components/location/LocationController');

// //Lấy danh sách event
// router.get('/', async function (req, res, next) {
//     try {
//         const events = await eventController.getAllEvents();
//         res.render('event/list', { events });
//     } catch (error) {
//         console.log("Get all event cpanel: ", error);
//         throw error;
//     }
// });

// // Lấy danh sách location thêm vào event
// router.get('/create', async function (req, res, next) {
//     try {
//         const locations = await locationController.getAllLocations();
//         res.render('event/add', { locations });
//     } catch (error) {
//         console.log("Get add event cpanel: ", error);
//         throw error;
//     }
// });

// // Thêm event
// router.post('/create', async function (req, res, next) {
//     try {
//         let {body, file} = req;
//         let {title, province_id, image} = body;
//         await eventController.createEvent(title, province_id, image);
//         res.render('event/list');
//     } catch (error) {
//         console.log("Post add event cpanel: ", error);
//         throw error;
//     }
// });

module.exports = router;