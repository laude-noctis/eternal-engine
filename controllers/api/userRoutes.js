const router = require('express').Router();
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
        const userLogin = await User.findOne({ where: { email: req.body.email } });
        if (!userLogin) {
            res.status(400).json({ message: "Incorrect email or password" });
            return;
        }

        const userPassword = await userLogin.checkPassword(req.body.password);
        if (!userPassword) {
            res.status(400).json({ message: "Incorrect email or password" });
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

router.post("/logout", async (req, res) => {
    try {
        if (!req.session.logged_in) {
            await req.session.destroy();
        }
        res.status(200);
    } catch (err) {
        res.status(500);
    }
});

module.exports = router