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
    const account ={
      email,
      phone_number,
      avatar,
      created_at,
      name
    };

    const result = await accountController.saveAccount(
      email,
      phone_number,
      avatar,
      created_at,
      name
    );
    if(result){

    console.log("result",result);

      return res.status(200).json({
        result: true,
        message: "Lưu thông tin tài khoản thành công",
        account: account,
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

module.exports = router;
