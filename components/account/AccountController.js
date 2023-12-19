const accountService = require("./AccountService");

const getAllAccounts = async () => {
  try {
    return (await accountService.getAllAccounts());
  } catch (error) {
    console.log("Get all accounts controller ", error);
    throw error;
  }
};
// lưu thông tin tài khoản vào database khi đăng nhập lần đầu

const saveAccount = async (email, phone_number, avatar, name) => {
  try {
    const savedAccount = await accountService.saveAccount(
      email,
      phone_number,
      avatar,
      name
    );

    if (savedAccount) {
      return savedAccount;
    }

    return null;
  } catch (error) {
    console.log("Save account controller failed: ", error);
    return false;
  }
};

// Lấy thông tin tài khoản theo email
const getAccountByEmail = async (email) => {
  try {
    const account = await accountService.getAccountByEmail(email);
    if (account) {
      return account;
    }
    return null;
  } catch (error) {
    console.log("Lấy thông tin tài khoản theo email controller: ", error);
    return false;
  }
};

// Lấy thông tin tài khoản theo email
const getAccountById = async (user_id) => {
  try {
    const account = await accountService.getAccountById(user_id);
    if (account) {
      return account;
    }
    return null;
  } catch (error) {
    console.log("Lấy thông tin tài khoản theo Id controller: ", error);
    return false;
  }
};

// api chỉnh sửa thông tin cá nhân
const updateAccount = async (id, name, phone_number, avatar) => {
  try {
    const account = await accountService.updateAccount(
      id,
      name,
      phone_number,
      avatar
    );
    if (account) {
      return account;
    }
    return null;
  } catch (error) {
    console.log("Cập nhật thông tin tài khoản controller error: ", error);
    return false;
  }
};

const sendEmail = async (email, subject, content) => {
  try {
    return await accountService.sendEmail(email, subject, content);
  } catch (error) {
    console.log("Gửi email error: ", error);
    return false;
  }
}

module.exports = {
  getAllAccounts,
  saveAccount,
  getAccountByEmail,
  getAccountById,
  updateAccount,
  sendEmail
};
