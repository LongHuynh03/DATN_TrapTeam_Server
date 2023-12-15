var express = require('express');
var router = express.Router();
const userController = require('../../components/account/AccountController');

//Lấy danh sách user
// router.get('/', async function(req, res, next) {
//     try {
//       const users = await userController.getAllAccounts();
//       res.render('guest/list', {users});
//     } catch (error) {
//       console.log("Get all user cpanel error: " + error)
//       throw error;
//     }
//   });

module.exports = router;