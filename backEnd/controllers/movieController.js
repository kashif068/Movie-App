const Movie = require('../models/movie');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


//Get all movies
exports.getMovies = async (req, res) => {
    try {
        const userId = req.userId; // assuming req.userId contains the user's ID
 console.log(userId);

// Find movies created by the user
const Movies = await Movie.find({ user: userId });
        console.log(`Movies ${Movies}`)
        res.status(201).json({ message: 'All movies showing successfully', Movies });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Create a new movie
exports.createMovie = async (req, res) => {
    const { title, releaseYear } = req.body;
    const img = req.file.path;
    const userId = req.userId;
  
    if (!userId) {
      return res.status(403).json({ message: 'User not authenticated' });
    }
    
    // Create a new item without associating it with the user yet
    const newMovie = new Movie({ title, releaseYear, user: userId, img }); 
  
    try {
      const existingMovie = await Movie.findOne({ title });
      if (existingMovie) {
        return res.status(400).json({ message: 'Movie already exists' });
      }
  
      const savedMovie = await newMovie.save();
      return res.status(201).json({ message: 'Movie created successfully', savedMovie });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }


//Get single movie by ID
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(201).json({ message: 'Movie is showing by id successfully', movie});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Update movie
exports.updateMovie = (req, res) => {
    const userId = req.userId._id;
    console.log(`User ID ${userId}`)
    const img = req.file.path;
    const moviess =req.body;
    console.log("this is",moviess)
    const {title, releaseYear} = req.body
    const movieId = req.params.id;
    console.log(`Movie ID ${movieId}`)
    Movie.findById(movieId)
      .then((movie) => {
        if (movie && movie.userId === userId) {
          // Update the movie
          Movie.findByIdAndUpdate(movieId, {img, title, releaseYear}, { new: true })
            .then((updatedMovie) => {
              if (updatedMovie) {
                res.status(200).json({ message: 'Movie updated successfully', data: updatedMovie });
              } else {
                res.status(400).json({ message: 'Movie update failed' });
              }
            })
            .catch((error) => {
              res.status(500).json({ message: 'Error updating movie', error });
            });
        } else {
          res.status(403).json({ message: 'Forbidden' });
        }
      })
      .catch((error) => {
        console.error('Error fetching movie:', error.response ? error.response.data : error.message);
        setErrorMessage('Error fetching movie details.');
        // res.status(500).json({ message: 'Error updating movie' });
      });
    }



//Delete movie
exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie deleted successfully', movie });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};