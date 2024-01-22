const router = require('express').Router();
const { blogPost, User, Comments } = require('../models');
const withAuth = require("../utils/auth")

router.get('/', async (req, res) => {
    try {
        const blogpostData = await blogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
            ],
        });

        const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));

        res.render('homepage', {
            blogposts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
        console.error(err)
    }
});

router.get('/blogposts/:id', async (req, res) => {
    console.log("blogpost id route")
    try {
        const blogpostData = await blogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comments,
                    attributes: ["comment"]
                },
            ],
        });
        const blogpost = blogpostData.get({ plain: true })

        res.render('blogpost', {
            ...blogpost,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
        console.error(err)
    }
});

router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const loggedInUser = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
            include: [{ model: blogPost }], 
        });

        const user = loggedInUser.get({ plain: true });

        res.render("dashboard", {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
        console.error(err)
    }
})

router.get("/update/:id", withAuth, async (req, res) => {
    try {
        const blogpostData = await blogPost.findByPk(req.params.id);
    
        res.render("update", {
            title: blogpostData.title,
            description: blogpostData.description,
            id: blogpostData.id,
            date_created: blogpostData.date_created,
            logged_in: true
        });
    } catch {
        console.error(err)
        res.status(500).json(err)
    }
})

router.get("/new-post", withAuth, async (req, res) => {
    try {
        const loggedInUser = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] }, 
        });

        const user = loggedInUser.get({ plain: true });

        res.render("new-post", {
            ...user,
            logged_in: true
        });
    } catch {
        res.status(500).json(err)
        console.error(err)
    }
})

router.get("/signup", async (req, res) => {
    try {
        res.render('signup')
    } catch (err) {
        res.status(500).json(err)
        console.error(err)
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login')
});

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

module.exports = router;