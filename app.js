let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let cors = require('cors');
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
app.use(cors());
app.use(multer({storage: imageStorage}).single('imageFile'));
app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestRouter);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


app.use(express.static('public'));
app.listen(3000, () => console.log("listening on Port 3000"));
