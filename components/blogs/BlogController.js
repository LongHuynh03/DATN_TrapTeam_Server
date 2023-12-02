const blogService = require("./BlogService");

const getAllBlogs = async (page, size) => {
  try {
    return await blogService.getAllBlogs(page, size);
  } catch (error) {
    console.log("Get all blogs controller ", error);
    throw error;
  }
};

module.exports = {
  getAllBlogs,
};
