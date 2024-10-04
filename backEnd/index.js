const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
require('dotenv').config();
const app = express();
const cors = require('cors')
app.options('*', cors()); 
app.use(cors())

connectDB();

app.use( express.json());

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));