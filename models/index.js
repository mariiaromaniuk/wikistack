const Sequelize = require("sequelize");
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
}); 

const User = db.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isUrl: false,
            isEmail: false,
            unique: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isUrl: false,
            isEmail: true,
            unique: true
        }
    }
});

const Page = db.define('pages', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isUrl: false,
            isEmail: false,
        }
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isUrl: false,
            isEmail: false,
        }
    }, 
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    }
})
    

module.exports = { db, Page, User };