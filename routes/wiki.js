const express = require('express');
const router = express.Router();
const { Page, generateSlug } = require('../models/index');
const { addPage } = require('../views');

router.post('/', async (req, res, next) => {
    console.log(req);  
    // make sure we only redirect *after* our save is complete!
    // `.save` returns a promise
    try {
      await Page.create({ 
        title: req.body.title,
        content: req.body.content,
    }); 
      res.redirect('/');
    } catch (error) { 
        next(error) 
    }
  });

router.get('/add', (req, res) => {
    res.send(addPage());
});

module.exports = router;



