const connectToMongo = require('./db');
const express = require('express');

var cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

/* ======= image upload ===== */
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// serving static files
app.use('/public/uploads', express.static('public/uploads'));

// handle storage using multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
var upload = multer({ storage: storage });

// handle single file upload
app.post('/uploadfile', upload.single('dataFile'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: 'Please upload a file.' });
  }
  return res.send({ message: 'File uploaded successfully.', file });
});

/* ======= image upload ===== */

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/blogs', require('./routes/blogs'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
