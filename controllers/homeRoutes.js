const router = require('express').Router();
const { blogPost, User } = require('../models');
const withAuth = require('../utils/auth');

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

        res.render('FILL IN LATER', {
            blogposts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blogpost/:id', async (req, res) => {
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

        res.render('FILL IN LATER', {
            ...blogpost,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/login', (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login')
});

module.exports = router;