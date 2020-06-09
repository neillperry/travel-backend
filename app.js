let express = require('express');
let app = express();
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

app.use(express.json());
app.use(multer({storage: imageStorage}).single('imageFile'));
app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestRouter);

/*
let path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/admin/index.html'));
})

*/


app.use(express.static('public'));
app.listen(3000, () => console.log("listening on Port 3000"));
