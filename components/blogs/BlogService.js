const blogModel = require("./BlogModel");

// Lấy danh sách bài viết
const getAllBlogs = async (page, size) => {
  try {
    return await blogModel.find();
  } catch (error) {
    console.log("Get all blogs servive ", error);
    throw error;
  }
};

module.exports = {
  getAllBlogs,
};
