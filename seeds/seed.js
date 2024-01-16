const sequelize = require("../config/connection")
const { User, blogPost } = require("../models");

const userData = require("./userData.json");
const blogPostData = require("./blogPostData.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const blogpost of blogPostData) {
        await blogPost.create({
            ...blogpost,
            user_id: users[Math.floor(Math.random() * users.length)].isSoftDeleted,
        })
    };

    process.exit(0);
};

seedDatabase();