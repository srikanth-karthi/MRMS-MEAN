const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const client = require('../config/redis')



const secretKey = process.env.secretKey

    const signAccessToken = (userId) => {
        try {
return  JWT.sign({ id: userId }, secretKey, { expiresIn: '1h' });
       ;
        } catch (err) {
          console.error(err.message);
          throw createError.InternalServerError();
        }
      };
      
       

      const signRefreshToken = (userId) => {
        try {
          const token = JWT.sign({ id: userId }, secretKey, {
            expiresIn: '1y',
            issuer: 'pickurpage.com'
          });
          
    //   client.SET(userId, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
        //     if (err) {
        //       console.log(err.message)
        // createError.InternalServerError()
        //       return
        //     }
        // })
          
          return token;
        } catch (err) {
          console.error(err.message);
          throw createError.InternalServerError();
        }
      };
      

        module.exports = {
            signRefreshToken,signAccessToken
        }