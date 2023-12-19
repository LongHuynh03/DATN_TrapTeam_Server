const express = require("express");
const accountModel = require('./AdminModel');

// Lấy tài khoản tại name và password truyền vào từ body của request 
const getAccount = async (name, password) => {
  try {
    return await accountModel.findOne({ name: name, password: password });
  } catch (error) {
    console.log("Lấy thông tin tài khoản service: ", error);
    return null;
  }
};

module.exports = {
    getAccount,
    };