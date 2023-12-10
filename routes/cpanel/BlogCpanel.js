var express = require('express');
var router = express.Router();
const blogController = require('../../components/blogs/BlogController');

//Lấy danh sách bài viết
router.get('/', async function (req, res, next) {
    try {
        const blogs = await blogController.getAllBlogs();
        res.render('blogs', { blogs });
    } catch (error) {
        console.log("Get all blog cpanel: ", error);
        throw error;
    }
});

//Thay đổi trạng thái blogs
router.post('/', async function (req, res, next) {
    try {
        const { blog_id } = req.params;
        const { status } = req.params;

        await blogController.changeStatus(blog_id, status);
        return res.render('/blogs');
    } catch (error) {
        console.log("Change status blog cpanel: ", error);
        throw error;
    }
});


module.exports = router;