const express = require('express');

const multer = require('multer');

const router = express.Router();
const app = express();

const {
    getMovies,
    createMovie,
    getMovieById,
    updateMovie,
    deleteMovie,
} = require('../controllers/movieController');
const validateMovie = require('../middlewares/validateMovie');
const verifyToken = require('../middlewares/verifyToken');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');     // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Create a unique filename
    cb(null, uniqueSuffix + '-' + file.originalname); // Use the original filename with a unique prefix
  }
});

  const upload = multer({ storage: storage })
  
router.get('/',verifyToken, getMovies);
router.post('/create', upload.single('img') ,validateMovie, verifyToken, createMovie);
router.get('/:id', verifyToken, getMovieById);
router.put('/:id',  upload.single('img'), validateMovie, verifyToken, updateMovie); 
router.delete('/:id', verifyToken, deleteMovie);

module.exports = router;