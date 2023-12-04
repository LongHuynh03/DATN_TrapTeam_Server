const blogService = require("./BlogService");
// Lấy danh sách bài viết
const getAllBlogs = async (page, size) => {
  try {
    return await blogService.getAllBlogs(page, size);
  } catch (error) {
    console.log("Get all blogs controller ", error);
    throw error;
  }
};
// Lấy danh sách bài viết theo user_id
const getAllBlogsByUserId = async (user_id) => {
  try {
    return await blogService.getAllBlogsByUserId(user_id);
  } catch (error) {
    console.log("Lấy danh sách bài viết theo user_id controller: ", error);
    throw error;
  }
}
module.exports = {
  getAllBlogs,
  getAllBlogsByUserId
};
