const { blogPost } = require("../../models");
const router = require("express").Router();
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    console.log("/api/blogposts")
    try {
        const newBlogPost = await blogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newBlogPost)
    } catch (err) {
        res.status(400).json(err)
    }
});

router.delete("/:id", withAuth, async (req, res) => {
    console.log("blogpost delete route")
    try {
        const deleteBlogPost = await blogPost.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json(deleteBlogPost);
    } catch (err) {
        res.status(400).json({ error: "Failed to delete blog post :(" });
    }
});

router.put("/update/:id", withAuth, async (req, res) => {
    console.log("updating blogpost route");
    try {
      const currentPost = await blogPost.update(req.body, {
        where: {
            id: req.params.id
        }
      });
      console.log(currentPost)

      if (!currentPost) {
        return res.status(404).json({ error: "Post not found" });
      }

      res.render("blogposts/:id")
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;