let express = require('express');
let server = express();
let mongoose = require('mongoose');
let multer = require('multer');
let postsRouter = require('./routes/posts');
let callbackRequestRouter = require('./routes/callback-requests');


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

server.use(express.json());
server.use(multer({storage: imageStorage}).single('imageFile'));
server.use('/posts', postsRouter);
server.use('/callback-requests', callbackRequestRouter);

/*
let path = require('path');

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
})

server.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/admin/index.html'));
})

*/


server.use(express.static('public'));
server.listen(3000, () => console.log("listening on Port 3000"));
