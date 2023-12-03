const accountService = require("./AccountService");

const getAllAccounts = async (page, size) => {
  try {
    return await accountService.getAllAccounts(page, size);
  } catch (error) {
    console.log("Get all accounts controller ", error);
    throw error;
  }
};
// lưu thông tin tài khoản vào database khi đăng nhập lần đầu

const saveAccount = async (
  email,
  phone_number,
  avatar,
  created_at,
  name
) => {
  try {
    return await accountService.saveAccount(
      email,
      phone_number,
      avatar,
      created_at,
      name
    );
  } catch (error) {
    console.log("Save account controller failed ", error);
    return false;
  }
};

module.exports = {
  getAllAccounts,
  saveAccount,
};
