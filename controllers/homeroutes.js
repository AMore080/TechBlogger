const router = require('express').Router();
const { UserPost, User } = require('../models');

router.get('/', async (req,res) => {
     try{
        const userposts = await UserPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ],
        });
        const posts = userposts.map((post) => post.get({plain: true}));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
     } catch (err) {
        res.status(500).json(err)
     }
})

router.get('/login', (req, res) => {
    if (req.session?.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

module.exports = router;