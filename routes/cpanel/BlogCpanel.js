var express = require("express");
var router = express.Router();
const blogController = require("../../components/blogs/BlogController");
const auth = require('../../midle/Authen');
const jwt = require('jsonwebtoken');

function formatDateString(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
}

//Lấy danh sách bài viết
router.get("/",[auth.authenWeb], async function (req, res, next) {
  try {
    const query = await blogController.getAllBlogs();
    const blogs = query.map((blog) => {
      return {
        _id: blog._id,
        user_id: {
          _id: blog.user_id._id,
          phone_number: blog.user_id.phone_number,
          name: blog.user_id.name,
          email: blog.user_id.email,
          avatar: blog.user_id.avatar,
        },
        content: blog.content,
        image: blog.image,
        created_at: formatDateString(blog.created_at),
        status: blog.status,
      };
    });
    res.render("blogs", { blogs });
  } catch (error) {
    console.log("Get all blog cpanel: ", error);
    throw error;
  }
});


// // Xóa bài viết
 router.get('/:id/deleted',[auth.authenWeb], async function (req, res, next) {
    try {
      const { id } = req.params;
      await blogController.deleteBlog(id);
      return res.json({ status: true });
    } catch (error) {
      return res.json({ status: false });
    }
  })

module.exports = router;
