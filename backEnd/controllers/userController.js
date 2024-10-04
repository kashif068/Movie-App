const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRET_KEY;

//Get all users
exports.getUsers = async (req, res) => {
    try {
        const Users = await User.find();
        res.status(201).json({ message: 'All users showing successfully', Users });
    } catch (err) {
        res.status(500).json({ message:err.message });
    }
};


//Create a new user
exports.createUser = async (req, res) => {
    const { userName, email, password, movies } = req.body;

    try {
         const existingEmail = await User.findOne({ email });
        if(existingEmail) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            email,
            password : hashedPassword,
        });           

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', newUser });

    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message})
    }
};


//Get a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        } 

        res.status(201).json({ message: 'Single user by id is showing successfully', user});

    } catch(error) {
        res.status(500).json({ error: error.message});
    }
};


//Login user
exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required'});
    }

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ meassage: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id, username: user.userName, email: user.email},
            process.env.SECRET_KEY,
            { expiresIn: '90d'}
        );

        res.status(200).json({ 
            message: 'Login successfully', 
            token, 
            user: {
                userName : user.userName,
                email : user.email,
                password : user.password,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};


//Update an user
exports.updateUser = async (req, res) => {
    const { password } = req.body;

  try {
    let user;

    if (password) {

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = await User.findByIdAndUpdate(req.params.id, {
        ...req.body,
        password: hashedPassword,
      }, { new: true });
    } else {

      user = await User.findByIdAndUpdate(req.params.id, req.body, { 
      new: true
      });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(201).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: message });
  }
};


//Delete an user
exports.deleteUser = async (req, res) => {
    try {
    const user = await User.findByIdAndDelete(req.params.id);
       if (!user) {
           res.status(404).json({ message: 'User not found' });
        }

       res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
       res.status(500).json({ message: error.message });
    }
};