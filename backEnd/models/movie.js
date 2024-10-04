const { required } = require('joi');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
      },
    releaseYear: {
        type: Number,
        required: true,
      },
    img: {
      data: Buffer,
      type: String,
    },
      // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    user: { 
        type: Object, 
        ref: 'User' 
      }
    
})

module.exports = mongoose.model('Movie', movieSchema);