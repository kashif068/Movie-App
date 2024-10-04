const express = require('express');
const router = express.Router();
const {
    getUsers, 
    createUser, 
    getUserById,
    loginUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');
// const validateUser = require('../middlewares/validateUser');
// const verifyToken = require('../middlewares/verifyToken');

router.get('/', getUsers);
router.post('/register', createUser);
router.get('/:id', getUserById);
router.post('/login', loginUser); 
router.put('/:id', updateUser); //validateUser, verifyToken, 
router.delete('/:id', deleteUser);

module.exports = router;