const { Comments } = require("../../models");
const router = require("express").Router();
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    console.log("/api/comments");
    try {
        const newComment= await Comments.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment)
        res.render("blogpost")
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
});

module.exports = router