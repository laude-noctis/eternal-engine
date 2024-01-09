const User = require('./user');
const blogPost = require('./blogpost')

User.hasMany(blogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

blogPost.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, blogPost };