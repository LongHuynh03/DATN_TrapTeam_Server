var express = require("express");
var router = express.Router();
const userController = require("../../components/account/AccountController");
const auth = require('../../midle/Authen');
const jwt = require('jsonwebtoken');


function formatDateString(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
}

//Lấy danh sách user
router.get("/",[auth.authenWeb], async function (req, res, next) {
  try {
    const query = await userController.getAllAccounts();
    const users = query.map(user => {
      return {
        _id: user._id,
        email: user.email,
        phone_number: user.phone_number,
        avatar: user.avatar,
        name: user.name,
        created_at: formatDateString(user.created_at),
      }
    });
    res.render("guest/list", { users });
  } catch (error) {
    console.log("Get all user cpanel error: " + error);
    throw error;
  }
});




module.exports = router;
