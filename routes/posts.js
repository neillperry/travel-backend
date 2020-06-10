// manages the routes for creating, deleting, updating, and reading posts
let uniqid = require('uniqid');
let Post = require('../models/post.js').Post;
let express = require('express');
let router = express.Router();

router.get('/', async (request, response) => {
    let posts = await Post.find();
    console.log("get those posts, knuckleheads");
    console.log(posts);
    response.send(testPost);
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
      } else {
        imgPath = "/src/images/photos";
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

router.put('/:id'), async (request, response) => {
  let id = request.params.id;
  await Post.updateOne({id: id}, request.body);
  response.send('Post Updated');
}

module.exports = router;
