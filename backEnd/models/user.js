const { required } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required: true,
        min : 3,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        min : 3,
    },
    password : {
        type : String,
        required : true,
        min : 3,
    }
})

module.exports = mongoose.model('user', userSchema);
