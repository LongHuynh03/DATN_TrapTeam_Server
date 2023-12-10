const blogModel = require("./BlogModel");

// Lấy danh sách bài viết
const getAllBlogs = async (page, size) => {
  try {
    return await blogModel.find().populate("user_id", "");
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
};

// Thêm bài viết
const createBlog = async (user_id, content, image, create_at, status) => {
  try {
    const newBlog = {
      user_id,
      content,
      image,
      create_at,
      status,
    };
    const blog = new blogModel(newBlog);
    await blog.save();
    return true;
  } catch (error) {
    console.log("Create blog service: ", error);
    throw error;
  }
};

//Thay đổi trạng thái bài viết
const changeStatus = async ( blog_id, status) => {
  try {
    const blog = await blogModel.findById(blog_id);
    if (blog) {
      blog.status = status ? status : blog.status;
      await blog.save();
      return blogModel.findById(blog._id);
    }
    return false;
  } catch (error) {
    console.log("Change status blog service: ", error);
    throw error;
  }
}

module.exports = {
  getAllBlogs,
  getAllBlogsByUserId,
  createBlog,
  changeStatus,
};
