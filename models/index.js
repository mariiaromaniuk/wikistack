const Sequelize = require("sequelize");
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const User = db.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        // validate: {
        //     isUrl: false,
        //     isEmail: false,
        //     unique: true
        // }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        // validate: {
        //     isUrl: false,
        //     isEmail: true,
        //     unique: true
        // }
    }
});

const Page = db.define('pages', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        // validate: {
        //     isEmail: false,
        // }
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
        // validate: {
        //     isEmail: false,
        // }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    }, 
    }, {
    hooks: {
        beforeValidate: function generateSlug(Page) {
            // Removes all non-alphanumeric characters from title
            // And make whitespace underscore
            Page.slug = Page.title.replace(/\s+/g, '_').replace(/\W/g, '');
    }
}
})


module.exports = { db, Page, User };