const JWT = require('jsonwebtoken');
require('dotenv').config();
const createError = require('http-errors');
const redisClient = require('../config/redis');

verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    JWT.verify(refreshToken, process.env.secretKey, async function (err, payload) {
      if (err) return reject(createError.Unauthorized());

      const userId = payload.aud;
      const storedToken = await redisClient.get(`token:${userId}`);

      if (!storedToken) {
        return reject(createError.Unauthorized());
      }

      if (storedToken === refreshToken) {
        resolve(userId);
      } else {
        reject(createError.Unauthorized());
      }
    });
  });
};

module.exports = verifyRefreshToken;
