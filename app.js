let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let postsRouter = require('./routes/posts');
let callbackRequestRouter = require('./routes/callback-requests');
let emailRouter = require('./routes/emails');
let Post = require('./models/post').Post;

app.set('view engine', 'ejs');

// CONNECT TO DATABASE
const url = 'mongodb://localhost/travels';
mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected to the database");
}).catch((error) => {
    console.log("Not connected to the database: ", error)
});

let imageStorage = multer.diskStorage({
  destination: (request, file, callback) => callback(null, 'public/images'),
  filename: (request, file, callback) => callback(null, file.originalname)
});


app.use(express.json());
app.use(multer({storage: imageStorage}).single('imageFile'));
app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestRouter);
app.use('/emails', emailRouter);

app.get('/sight', async (request, response) => {
   let id = request.query.id;
   let post = await Post.findOne({id: id});
   response.render('sight', {
      title: post.title,
      imageURL: post.imageURL,
      date: post.date,
      text: post.text
   })
})


app.use(express.static('public'));
app.listen(3000, () => console.log("listening on Port 3000"));
