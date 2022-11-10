const router = require('express').Router();
const { UserPost, User } = require('../models');
const withAuth = require('../utils/auth');

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

router.get('/profile', withAuth, async (req,res) => {
    try{
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{model: UserPost}],
        });

        const user = userData.get({plain: true});

        res.render('post', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;