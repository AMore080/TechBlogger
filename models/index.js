const User = require('./User');
const UserPost = require('./UserPost');

User.hasMany(UserPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

UserPost.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, UserPost };