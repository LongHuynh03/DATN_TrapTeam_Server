const express = require("express");
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
// Lưu thông tin tài khoản vào database khi đăng nhập lần đầu
const saveAccount = async (email, phone_number, avatar, created_at, name) => {
  try {
    const newAccount = {
      email,
      phone_number,
      avatar,
      created_at,
      name,
    };

    const account = new accountModel(newAccount);
    await account.save();
    return accountModel.findById(account._id);
  } catch (error) {
    console.log("Save account servive failed: ", error);
    return false;
  }
};

// lấy thông tin tài khoản theo email
const getAccountByEmail = async (email) => {
  try {
    return await accountModel.findOne({ email: email });
  } catch (error) {
    console.log("Lấy thông tin tài khoản theo email service: ", error);
    return null;
  }
};

module.exports = {
  getAllAccounts,
  saveAccount,
  getAccountByEmail,
};
