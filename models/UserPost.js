const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserPost extends Model {}

UserPost.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          title: {
            type: Datatypes.STRING,
            allowNull: false,
          },
          post: {
            type: Datatypes.STRING,
            allowNull: false,
          },
          date_created: {
            type: Datatypes.DATE,
            allowNull: false,
            defaultValue: Datatypes.NOW,
          },
          user_id: {
            type: Datatypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
          },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'userpost',
    }
)

module.exports = UserPost;