const accountModel = require("./AccountModel");

// Lấy danh sách tài khoản
const getAllAccounts = async (page, size) => {
  try {
    return await accountModel.find();
  } catch (error) {
    console.log("Get all accounts servive ", error);
    throw error;
  }
};

module.exports = {
  getAllAccounts,
};
