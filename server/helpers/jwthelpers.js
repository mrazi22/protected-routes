const JWT =  require('jsonwebtoken')
const  createErrors = require('http-errors')
const user = require('../models/registrationModel')


module.exports = {
    signAcessToken:(userId) =>{
        return new Promise((resolve,reject) =>{
            const payload = {}
            const secret = process.env.ACESS_TOKEN_SECRET
            const options = {
                expiresIn:'10m',
                issuer:'simonZiri',
                audience: userId

            }
            JWT.sign(payload,secret,options,(error,token) =>{
                if (error) reject(error)
                    resolve(token)
            })

        })
    },
    //verify if token hasnt been tamperd with
    verifyAccessToken: (req, res, next) => {
        // Check for authorization header
        if (!req.headers['authorization']) {
          return next(createErrors.Unauthorized('Authorization header is missing'));
        }
      
        // Extract token from header
        const authHeader = req.headers['authorization'];
        const [bearer, token] = authHeader.split(' ');
      
        // Validate token format
        if (bearer !== 'Bearer' || !token) {
          return next(createErrors.Unauthorized('Invalid token format'));
        }
      
        // Verify token with secret
        JWT.verify(token, process.env.ACESS_TOKEN_SECRET, (err, payload) => {
          if (err) {
            // Handle different error types (e.g., expired token, invalid signature)
            if (err.name === 'JsonWebTokenError') {
              return next(createErrors.Unauthorized('Invalid token'));
            } else if (err.name === 'TokenExpiredError') {
              return next(createErrors.Unauthorized('Token expired'));
            } else {
              return next(createErrors.Unauthorized());
            }
          }
      
          // Attach payload to request object for further use
          req.payload = payload;
          next();
        });
      },
      

    }