var express = require("express");
var router = express.Router();
const blogController = require("../../components/blogs/BlogController");

//Lấy tất cả bài viết
// http://localhost:3000/api/blog/getAllBlogs

router.get("/getAllBlogs", async (req, res) => {
  try {
    const blogs = await blogController.getAllBlogs();
    return res.status(200).json({
      result: true,
      blogs: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      blogs: [],
    });
  }
});

// Lấy danh sách bài viết theo user_id
// http://localhost:3000/api/blog/getAllBlogsByUserId?user_id=
router.get("/getAllBlogsByUserId", async (req, res) => {
  try {
    const blogs = await blogController.getAllBlogsByUserId(req.query.user_id);
    return res.status(200).json({
      result: true,
      blogs: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      blogs: null,
      message: error.message,
    });
  }
});

module.exports = router;
