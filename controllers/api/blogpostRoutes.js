const { blogPost } = require("../../models");
const router = require("express").Router();
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (res, req) => {
    try {
        const newBlogPost = await blogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newBlogPost)
    } catch (err) {
        res.status(400).json(err)
    }
})