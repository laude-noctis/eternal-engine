const User = require('./user');
const blogPost = require('./blogpost')
const Comments = require('./comments')

User.hasMany(blogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

blogPost.belongsTo(User, {
    foreignKey: 'user_id'
})

blogPost.hasMany(Comments, {
    foreignKey: "blogpost_id"
})

Comments.belongsTo(User, {
    foreignKey: "user_id"
})

module.exports = { User, blogPost, Comments };