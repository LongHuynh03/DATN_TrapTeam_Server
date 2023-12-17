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
};
// Thêm bài viết
const createBlog = async (user_id, content, image, status) => {
  try {
    return await blogService.createBlog(
      user_id,
      content,
      image,
      status
    );
  } catch (error) {
    console.log("Create blog controller: ", error);
    throw error;
  }
};

// Thay đổi trạng thái bài viết
const changeStatus = async (blog_id, status) => {
  try {
    return await blogService.changeStatus(
      blog_id,
      status
    );
  } catch (error) {
    console.log("Change status blog controller: ", error);
    throw error;
  }
};

const deleteBlog = async (blog_id) => {
  try {
    return await blogService.deleteBlog(blog_id);
  } catch (error) {
    console.log("Delete blog controller: ", error);
    throw error;
  }
}

module.exports = {
  getAllBlogs,
  getAllBlogsByUserId,
  createBlog,
  changeStatus,
  deleteBlog
};
