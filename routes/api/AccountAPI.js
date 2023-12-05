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
// lưu thông tin tài khoản khi đăng nhập lần đầu
// http://localhost:3000/api/account/saveAccount
router.post("/saveAccount", async (req, res) => {
  try {
    const { email, phone_number, avatar, created_at, name } = req.body;

    const savedAccount = await accountController.saveAccount(
      email,
      phone_number,
      avatar,
      created_at,
      name
    );

    if (savedAccount) {
      return res.status(200).json({
        result: true,
        message: "Lưu thông tin tài khoản thành công",
        account: savedAccount,
      });
    }

    return res.status(400).json({
      result: false,
      message: "Lưu thông tin tài khoản thất bại",
      account: null,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      message: error.message,
    });
  }
});

// Lấy tài khoản theo id

// Lấy tài khoản theo email
// http://localhost:3000/api/account/getAccountByEmail?email=
router.get("/getAccountByEmail", async (req, res) => {
  try {
    const { email } = req.query;
    const account = await accountController.getAccountByEmail(email);

    if (account) {
      return res.status(200).json({
        result: true,
        message: "Lấy thông tin tài khoản thành công",
        account: account,
      });
    }

    return res.status(400).json({
      result: false,
      message: "Không tìm thấy tài khoản",
      account: null,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      message: error.message,
    });
  }
});

module.exports = router;
