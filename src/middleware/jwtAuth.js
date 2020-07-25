require('dotenv').config();
const jwt = require('jsonwebtoken');

function jwtAuth(req, res, next) {
 
  // console.log(req.header('authorization'));

  // this gets THAT header key but I need Authorization
  // const token = req.header('x-notex-token')
  const token = req.header('authorization');

  if(!token) return res.status(401).send({message: 'Access denied. No token provided'});

  // console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.user = decoded;

    //entonces accedes al req.user._id
    //que puso en generateAuthToken()

    //esto pasa a la siguiente function del middleware
    next(); 

  }
  catch(ex) {
    res.status(400).send('Invalid Token.')
  } 
}

module.exports = jwtAuth;