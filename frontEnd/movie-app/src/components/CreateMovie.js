import React, { useEffect, useState } from 'react';
import './CreateMovie.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateMovie() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [img, setImg] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log(`Images of ${img}`);
  }, [img]);

  const handleTitle = (e) => {
    setTitle(e.target.value.trim());
    setErrorMessage(''); // Clear error message when typing
  };

  const handleReleaseYear = (e) => {
    const newReleaseYear = parseInt(e.target.value, 10);
    if (!isNaN(newReleaseYear)) {
      setReleaseYear(newReleaseYear);
      setErrorMessage(''); // Clear error message when typing
    }
  };

  const handleImage = (e) => {
    const newImg = e.target.files[0];

    // Ensure a file is selected
    if (!newImg) {
      console.error("No file selected");
      return;
    }

    // Log the file details
    console.log(`Image selected:`);
    console.log(`Name: ${newImg.name}`);
    console.log(`Type: ${newImg.type}`);
    console.log(`Size: ${newImg.size} bytes`);

    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validImageTypes.includes(newImg.type)) {
      console.error("Invalid file type. Please upload an image.");
      return;
    }

    // Validate file size
    // const maxSize = 5 * 1024 * 1024; // 5MB
    // if (newImg.size > maxSize) {
    //   console.error("File size exceeds the 5MB limit.");
    //   return;
    // }

    setImg(newImg);
    console.log("Image selected:", newImg.name);
  };

  const token = localStorage.getItem('token');
  console.log(`Token ${token}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!title || !releaseYear || !img) {
      setErrorMessage('Please fill out all fields and upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('releaseYear', releaseYear);
    formData.append('img', img);
console.log(formData, 'this is create form')
    try {
      const result = await axios.post(
        'http://localhost:4000/api/movies/create', 
        formData, 
        {
          headers: { 
            "Authorization": token 
          }
        }
      );

      console.log('Movie created successfully:', result.data);
      navigate('/movie-list')

      if (result.data.code === 403 && result.data.message === 'Token Expired') {
        localStorage.setItem('token', null);
        alert('Token has expired. Please log in again.');
      }
    } catch (error) {
      console.error('Error creating movie:', error);
      alert('Error creating movie. Please try again.');
    }
  };

  const handleCancel = () => {
    setTitle('');
    setReleaseYear('');
    setImg(null);
    setErrorMessage('');
  };

  return (
    <div className='content'>
      <div className="upload">
        <h1 className="title1">Create a new movie</h1>
        <div className="image-upload">
          <label htmlFor="image-upload">
            <i className="fa fa-upload"></i>
            <span>Drop an image here</span>
          </label>
          <input 
            onChange={handleImage} 
            type="file" 
            id="image-upload" 
            accept="image/*" 
            hidden 
          />
        </div>
      </div>
      <div className='control'>
        <form onSubmit={handleSubmit}>
          <div className="form-group7">
            <input 
              value={title} 
              onChange={handleTitle} 
              type="text" 
              id="title" 
              placeholder='Title' 
              required 
            />
          </div>
          <div className="form-group8">
            <input 
              value={releaseYear} 
              onChange={handleReleaseYear} 
              type="number" 
              id="publishing-year" 
              placeholder='Release Year' 
              required 
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="button-group">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="create-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateMovie;
