import React from 'react';
import './EmptyState.css';
import { useNavigate } from 'react-router-dom';

function EmptyState() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    navigate("/movie-list");
  }
  

  return (
    <>
    <div className='empty'>
      <h1>Welcome! Your movie list is empty</h1>
    </div>
    <div className='new'> 
      <button className='button2' onClick={handleSubmit}>Add a new movie</button>
    </div>
    </>
  );
};

export default EmptyState;