const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout');
const { db } = require('./models'); // spread operator !!!
const models = require('./models');
const app = express(); // run express

const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');



db.authenticate().
then(() => {
    console.log('connected to the database');
});

const init = async () => {
    try {
        // we've exported models, which gives us acces to all exported values from index.js
        await models.db.sync({force: true}); 
        console.log('The database for the models was (re)created!');
    }
    catch(error) {
        console.error(error);
    }
};

init();
 
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); // body parser
app.use(express.static(__dirname + "/public")); // path where static files are
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);


app.get('/', (req, res, next) => {
    res.redirect('/wiki');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
});