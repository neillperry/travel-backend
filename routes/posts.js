// manages the routes for creating, deleting, updating, and reading posts
let Post = require('../models/post').Post;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();
let path = require('path');

router.get('/', async (request, response) => {
    let posts = await Post.find();
    response.send(posts);
});

router.get('/:id', async (request, response) => {
    let id = request.params.id
    let post = await Post.findOne({id: id});
    response.send(post);
});

router.post('/', async (request, response) => {
    let reqBody = request.body;
    let imgPath;

    if (reqBody.imageURL) {
      imgPath = reqBody.imageURL;
    } else {
      if (request.file) {
        imgPath = request.file.path.substring(request.file.path.indexOf('/'), request.file.path.length);
      }
    }

    let newPost = new Post({
         id: uniqid(),
         title: reqBody.title,
         date: new Date(),
         description: reqBody.description,
         text: reqBody.text,
         country: reqBody.country,
         imageURL: imgPath
    })

    await newPost.save();
    response.send('Post Created');
});

router.delete('/:id', async (request, response) => {
   let id = request.params.id;
   await Post.deleteOne({id: id});
   response.send('Post Deleted');
});

router.put('/:id', async (request, response) => {
  console.log("Whereis the PUT request?");
  let id = request.params.id;
  await Post.updateOne({id: id}, request.body);
  response.send('Post Updated');
});

module.exports = router;
