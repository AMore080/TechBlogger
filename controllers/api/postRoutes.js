const router = require('express').Router();
const { UserPost } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req,res) => {
    res.render('post')
})

router.post('/', withAuth, async (req,res) => {
    try{
        const newPost = await UserPost.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req,res) => {
    try{
        const postData = await UserPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!postData) {
            res.status(404).json({message: 'No Post found with this ID!'});
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;