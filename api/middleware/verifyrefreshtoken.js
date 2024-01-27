const JWT = require('jsonwebtoken');
require('dotenv').config();
const createError = require('http-errors');
const redisClient = require('../config/redis');

verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    JWT.verify(refreshToken, process.env.secretKey, async function (err, payload) {
      
      if (err) return reject(createError.InternalServerError(err));

      const userId = payload.aud;
      const storedToken = await redisClient.get(`token:${userId}`);

      if (!storedToken) {
        return reject(createError.Unauthorized('token not found in redis'));
      }

      if (storedToken === refreshToken) {
        resolve(userId);
      } else {
        reject(createError.Unauthorized('token not match with token in redis'));
      }
    });
  });
};

module.exports = verifyRefreshToken;
