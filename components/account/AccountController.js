const accountService = require("./AccountService");

const getAllAccounts = async (page, size) => {
  try {
    return await accountService.getAllAccounts(page, size);
  } catch (error) {
    console.log("Get all accounts controller ", error);
    throw error;
  }
};

module.exports = {
  getAllAccounts,
};
