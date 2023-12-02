var express = require("express");
var router = express.Router();

const accountController = require("../../components/account/AccountController");

// Lấy tất cả tài khoản
// http://localhost:3000/api/account/getAllAccounts

router.get("/getAllAccounts", async (req, res) => {
  try {
    const accounts = await accountController.getAllAccounts();
    return res.status(200).json({
      result: true,
      accounts: accounts,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      accounts: [],
    });
  }
});

// Lấy tài khoản theo id

// Lấy tài khoản theo email

module.exports = router;
