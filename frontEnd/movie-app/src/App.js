import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp.js';
import SignIn from './components/SignIn.js';
import EmptyState from './components/EmptyState';
import MovieList from './components/MovieList';
import CreateMovie from './components/CreateMovie';
import EditMovie from './components/EditMovie'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/empty-state" element={<EmptyState />} />
        <Route path="/movie-list" element={<MovieList />} />
        <Route path="/create-movie" element={<CreateMovie />} />
        <Route path="/edit-movie/:id" element={<EditMovie />} />  
      </Routes>
    </Router>
  );
}

export default App;