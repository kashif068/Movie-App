// const JWT_SECRET = process.env.SECRET_KEY;

// // Middleware to validate JWT token
// const validateUser = ((req, res, next) => {
//   const authHeader = req.headers.authorization;
  
//   if (authHeader) {
//     const token = authHeader.split(' ')[1];
//     try {
//       const decodedToken = jwt.verify(token, JWT_SECRET ); // Replace with your actual secret
//       req.user = decodedToken;
//       next();
//     } catch (error) {
//       return res.status(403).json({ message: 'Invalid token' });
//     }
//   } else {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
// });


// module.exports = validateUser;



// // // middlewares/validatePassword.js
// // const Joi = require('joi');  //This is used for defining and validating data structures in Node.js.

// // const validateUser = (req, res, next) => {  //validateItem
// //   const schema = Joi.object({
// //     userName: Joi.string().required(),  //.min(3).
// //     email: Joi.string().required(),  //min(1).
// //     password: Joi.number().required(),  //min(0).
// //   });
  
// //   const { error } = schema.validate(req.body);
// //   if (error) {
// //     return res.status(400).json({ message: error.details[0].message });
// //   }
// //   next();
// // };