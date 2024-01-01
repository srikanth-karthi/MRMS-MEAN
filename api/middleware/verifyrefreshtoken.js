const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const { promisify } = require('util');
const redisClient = require('../config/redis');

require('dotenv').config();

const getAsync = promisify(redisClient.get).bind(redisClient);

const verifyRefreshToken = async (refreshToken) => {
  try {
    const payload = await new Promise((resolve, reject) => {
      JWT.verify(refreshToken, process.env.secretKey, (err, decoded) => {
        if (err) {
            console.log(err)
        //   reject(createError.Unauthorized());
        } else {
          resolve(decoded);
        }
      });
    });

    const userId = payload.aud;
    console.log(userId);
    try {
        const storedToken = await getAsync(`token:${userId}`);
        console.log('Stored Token:', storedToken);
  
        if (refreshToken === storedToken) {
          return userId;
        } else {
          throw createError.Unauthorized();
        }
      } catch (redisError) {
        console.error('Redis Error:', redisError);
        throw createError.InternalServerError('Error fetching data from Redis');
      }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

module.exports = verifyRefreshToken;
