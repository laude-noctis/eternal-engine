const router = require("express").Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const userLogin = await User.findOne({ where: { username: req.body.username } });
        if (!userLogin) {
            res.status(400).json({ message: "Incorrect username or password" });
            return;
        }

        const userPassword = await userLogin.checkPassword(req.body.password);
        if (!userPassword) {
            res.status(400).json({ message: "Incorrect username or password" });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userLogin.id;
            req.session.logged_in = true;
            res.status(200).json({ message: "You are now logged in!" });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/logout", (req, res) => {
    if (!req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router