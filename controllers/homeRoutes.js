const router = require('express').Router();
const { blogPost, User } = require('../models');
const withAuth = require("../utils/auth")

router.get('/', async (req, res) => {
    try {
        const blogpostData = await blogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
            ],
        });

        const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));

        res.render('homepage', {
            blogposts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blogposts/:id', async (req, res) => {
    try {
        const blogpostData = await blogPost.findbyPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const blogpost = blogpostData.get({ plain: true })

        res.render('blogpost', {
            ...blogpost,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get("/profile", withAuth, async (req, res) => {
    try {
        const loggedInUser = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
            include: [{ model: blogPost }], 
        });

        const user = loggedInUser.get({ plain: true });

        res.render("profile", {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login')
});

module.exports = router;