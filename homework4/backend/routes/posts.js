const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const PostModel = require('../models/PostModel');


router.get('/', authorize, (request, response) => {
    PostModel.getAllForUser(request.currentUser.id, (postIds) => {
        console.log(request.currentUser.id);
        if (postIds.length) {
            PostModel.getByIds(postIds, request.currentUser.id, (posts) => {
                response.status(201).json(posts)
            });
            return;
        }
        response.json([])

    })

});

router.post('/', authorize,  (request, response) => {
    params = {
      userId: request.currentUser.id,
      text: request.body.text,
      url: request.body.media.url,
      type: request.body.media.type
    }
    if(!request.body.text){
      response.status(400).json({
        code: 'PostWihtoutText',
        message: 'One may not post without contextual text'
      })
    }else{
      PostModel.create(params, () => {
        response.json({
          ok:true
        })
      })
    }

});


router.put('/:postId/likes', authorize, (request, response) => {

    let postId = request.params.postId;
    let userId = request.currentUser.id;
    PostModel.getLikesByUserIdAndPostId(userId, postId, () => {
      PostModel.like(userId, postId, () => {
        response.json({
          ok:true
        })
      })
    })
});

router.delete('/:postId/likes', authorize, (request, response) => {
    let postId = request.params.postId;
    let userId = request.currentUser.id;
    PostModel.getLikesByUserIdAndPostId(userId, postId, () => {
      PostModel.unlike(userId, postId, () => {
        response.json({
          ok:true
        })
      })
    })

});

module.exports = router;
