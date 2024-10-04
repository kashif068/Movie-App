import React, { useState } from 'react';
import './EditMovie.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditMovie() {
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [img, setImg] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();  
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  console.log(`Access Toekn ${token}`)

  const handleTitle = (e) => {
    const newTitle = e.target.value.trim();
    if (newTitle) {
      setTitle(newTitle);
      setErrorMessage('');
    } else {
      setErrorMessage('Title is required');
    }
  };

  const handleReleaseYear = (e) => {
    const newReleaseYear = parseInt(e.target.value, 10);
    if (!isNaN(newReleaseYear)) {
      setReleaseYear(newReleaseYear);
    } else {
      setErrorMessage('Please enter a valid release year');
    }
  };

  const handleImage = (e) => {
    const newImg = e.target.files[0];

    if (!newImg) {
      console.error("No file selected");
      return;
    }

    console.log(`Image selected:`);
    console.log(`Name: ${newImg.name}`);
    console.log(`Type: ${newImg.type}`);
    console.log(`Size: ${newImg.size} bytes`);

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


  const handleCancel = () => {
    navigate('/movie-list'); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(releaseYear,'this is realsesyerar')

    const token = localStorage.getItem('token');
    console.log(token,'this is token')
   
    if (!title || !releaseYear || !img) {
      setErrorMessage('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('releaseYear', releaseYear);
    formData.append('img', img);
    console.log('Selected file:', img);

    try {

      const result = await axios.put(`http://localhost:4000/api/movies/${id}`, 
        formData, 
        {
        headers: {
          "Authorization": token ,
        },
      });
      console.log('Movie updated successfully:', result.data);
      alert('Movie updated successfully');
      navigate('/movie-list');
    } catch (error) {
      alert('Service error');
      console.log(error);
    }
  };


  return (
    <>
      <div className='content2'>
        <div className="upload2">
          <h1 className="title2">Edit Movie</h1>
          <div className="image-upload2">
            <label htmlFor="image-upload">
              <i className="fa fa-upload"></i>
              <span>Drop an image here</span>
            </label>
            <input onChange={handleImage} type="file" id="image-upload" accept="image/*" hidden />
          </div>
        </div>
        <div className='control2'>
          <form>
            <div className="form-group9">
              <input value={title} onChange={handleTitle} name='title' type="text" id="title" placeholder='Title' required />
            </div>
            <div className="form-group10">
              <input value={releaseYear} onChange={handleReleaseYear} name='release-year' type="number" id="publishing-year" placeholder='Release Year' required />
            </div>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <div className="button-group">
              <button type="button" className="cancel-button2" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="update-button" onClick={handleSubmit}>Update</button>
            </div> 
          </form>
        </div>
      </div>
    </>
  );
}

export default EditMovie;