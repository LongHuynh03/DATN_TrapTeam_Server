const blogModel = require("./BlogModel");

// Lấy danh sách bài viết
const getAllBlogs = async (page, size) => {
  try {
    return await blogModel.find();
  } catch (error) {
    console.log("Get all blogs servive: ", error);
    throw error;
  }
};
// Lấy danh sách bài viết theo user_id
const getAllBlogsByUserId = async (user_id) => {
  try {
    if (await blogModel.exists({ user_id })) {
      // exists là kiểm tra xem có bài viết nào do user đăng hay chưa
      // trả về true nghĩa là user đã có bài viết và sẽ trả về mảng chứa các bài viết do user đó đăng
      // trả về false nghĩa là user chưa bài viết nên sẽ trả về mảng rỗng
      return await blogModel.find({ user_id });
    }
    return [];

  } catch (error) {
    console.log("Lấy danh sách bài viết theo user_id service: ", error);
    throw error;
  }
}
module.exports = {
  getAllBlogs,
  getAllBlogsByUserId
};
