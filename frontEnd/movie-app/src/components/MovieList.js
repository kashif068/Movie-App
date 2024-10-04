import React, { useEffect, useState } from 'react';
import './MovieList.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function MovieList() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    try{
      const token = localStorage.getItem('token');
      console.log(`Token ${token}`);
    const data = await axios.delete(`http://localhost:4000/api/movies/${id}`, 
      {
        headers: { 
          "Authorization": token 
        }
      }
    )
    navigate('/movie-list');
    console.log('Movie is deleted successfully:', data);
    navigate('/movie-list');
    alert('Movie deleted successfully! Reload the page to see changes');
    
    } catch (error) {
      console.log('error is', error);
    }
  }

  const handleMake = (e) => {
    navigate('/create-movie');
  }

  const token = localStorage.getItem('token');
  console.log(`Token ${token}`);
  
  const handleLogout = (e) => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
  
  if (confirmLogout) {
    localStorage.clear();
    console.log(localStorage.getItem('authToken')); 
    alert('You are logged out!')
    navigate('/SignIn'); 
  } else {
    console.log('Logout cancelled');
  }
};

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(`Token: ${token}`);

        const response = await axios.get('http://localhost:4000/api/movies/', {
          headers: {
            "Authorization": token,
          },
        });

        console.log('Response:', JSON.stringify(response.data, null, 2));

        if (Array.isArray(response.data.Movies)) {
          setMovies(response.data.Movies);
        } else {
          throw new Error('Movies data is not an array');
        }

      } catch (error) {
        console.error('Error fetching movies:', error.response ? error.response.data : error.message);
        setError('Failed to fetch movies.');
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <header>
        <h1>My Movies</h1>
        <button onClick={handleMake} className='click'>+</button>
        <button onClick={handleLogout}  className='logout-button'>Logout</button>
      </header>
      <div className="movie-list">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          movies.length > 0 ? (
            movies.map((movie) => (
              
              <div key={movie._id} className="movie-card">
                {console.log(`http://localhost:4000/${movie.img}`)}
                {movie.img ? (
                  <img src={`http://localhost:4000/${movie.img}`} alt={movie.title} />
                ) : (
                  <p>No image available</p>
                )}
                <h3>{movie.title}</h3>
                <p>{movie.releaseYear}</p>
                <Link to={`/edit-movie/${movie._id}`} className="Edit-button">
                  Edit
                </Link>
                <button onClick={()=>{handleDelete(movie._id)}} className='this-delete'>Delete</button>
              </div>
            ))
          ) : (
            <p>No movies found.</p>
          )
        )}
      </div>
      <div className="pagination">
        <div className='to-edit'>
        </div>
        <div className='tasks-buttons'>
        <button className="prev-btn">Prev</button>
        <span className="page-number">1</span>
        <span className="page-number">2</span>
        <button className="next-btn">Next</button>
        </div>
      </div>
    </>
  );
}

export default MovieList;
