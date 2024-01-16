const router = require("express").Router();

const userRoutes = require("./userRoutes");
const blogPostRoutes = require("./blogpostRoutes");

router.use("/users", userRoutes);
router.use("/blogposts", blogPostRoutes)

module.exports = router;