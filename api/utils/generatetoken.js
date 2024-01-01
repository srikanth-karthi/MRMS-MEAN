const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const client = require('../config/redis')



const secretKey = process.env.secretKey

    const signAccessToken = (userId) => {
        try {
return  JWT.sign({ id: userId }, secretKey, { expiresIn: 10 });
       ;
        } catch (err) {
          console.error(err.message);
          throw createError.InternalServerError();
        }
      };
      
       

      const signRefreshToken = (userId) => {
        try {
          const token = JWT.sign({  }, secretKey, {
            expiresIn: '1h',
            issuer: 'mrms.com',
            audience: JSON.stringify(userId),
          });
      

          client.SET(`token:${userId}`, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
            if (err) {
              console.error(err.message);
              throw createError.InternalServerError();
            }
            console.log('Token stored in Redis:', reply);
          });
      
          return token;
        } catch (err) {
          console.error(err.message);
          throw createError.InternalServerError();
        }
      };
      

        module.exports = {
            signRefreshToken,signAccessToken
        }