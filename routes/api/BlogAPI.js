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

module.exports = router;
