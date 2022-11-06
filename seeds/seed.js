const sequelize = require("../config/connection");
const { User, UserPost } = require("../models");

const userData = require("./userData.json");
const userPost = require("./userPost.json");

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for(const post of userPost) {
        await UserPost.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        })
    }
    process.exit(0);
}

seedDatabase();
