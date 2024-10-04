const jwt = require('jsonwebtoken');

// Get secret from environment variables
const JWT_SECRET = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const pretoken=req.header('Authorization')
    // console.log(` TOken Recieved ${pretoken}`)
    const token = req.header('Authorization')?.split(' ')[0];
    // console.log(`authentication ${token}`)
    if (!token) {   
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = decoded; // Attach userId to request for later use
        next();
    });
};

module.exports = verifyToken;