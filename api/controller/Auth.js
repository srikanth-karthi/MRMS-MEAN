require("dotenv").config();
const redisClient = require('../config/redis')

const bcrypt = require("bcrypt");
const { signRefreshToken,signAccessToken}=require("../utils/generatetoken")
const response = require('../handlers/responsejandler')
var sqldb = require('../config/mysql');
var verifyRefreshToken=require('../middleware/verifyrefreshtoken')

const createError = require("http-errors");



var loginController = {
  login: function (req, res,next) {
    const Email = req.body.email;
    const password = req.body.password;
    const query = "SELECT * FROM userdetails WHERE email = ?";
    sqldb.query(query, [Email], (error, results) => {
      if (error) {
        next( createError.InternalServerError(error))
        return;
      }
      if (results.length === 1) {
        const user = results[0];
        bcrypt.compare(password, user.password, (bcryptError, isMatch) => {
          if (bcryptError) {
            next( createError.InternalServerError(bcryptError))
            return;
          }
          if (isMatch) {
            console.log(user)

            const AccessToken = signAccessToken(user.id)
            const refreshToken=signRefreshToken(user.id)

            res.cookie('refreshToken', refreshToken, {
              maxAge:6000 * 10000,
              httpOnly: true,
              secure: true,
              sameSite: 'strict', 
            });
            response(res, 200, 'login sucess', { 'token': AccessToken })

          } else {
            next( createError[400]('Password not valid'))
       

          }
        });
      } else {
        next( createError[400]('Username not valid'))

      }
    })

  },
  register: async function (req, res,next) {
    const name = req.body.name;
    const email = req.body.email;
    console.log(req.body.password)
    const hashedpassword = await bcrypt.hash(req.body.password, 10);

    const checkQuery = `SELECT * FROM userdetails WHERE email = ?`;
    sqldb.query(checkQuery, [email], (error, results) => {
      if (error) {
        next( createError.InternalServerError(error))
      }
      if (results.length > 0) {
        next( createError[400]('Email already uesd'))
      } else {
        const insertQuery = "INSERT INTO userdetails (name, email, password) VALUES (?, ?, ?)";
        const insertValues = [name, email, hashedpassword];

   sqldb.query(insertQuery, insertValues, (Error) => {
          if (Error) {
            next( createError.InternalServerError(Error))
          }

          const selectUserQuery = "SELECT id FROM userdetails WHERE email = ?";
          sqldb.query(selectUserQuery, [email], (selectError, selectResults) => {
            if (selectError) {
              next( createError.InternalServerError(selectError))
            }

            if (selectResults.length === 1) {
              const userId = selectResults[0].id;
              console.log("User added with ID:", userId);
              const AccessToken = signAccessToken(userId)
              const refreshToken=signRefreshToken(userId)
        
              res.cookie('refreshToken', refreshToken, {
                maxAge:60 * 10000,
                httpOnly: true,
                secure: true,
                sameSite: 'strict', 
              });
              response(res, 200, 'login sucess', { 'token': AccessToken })
            } else {
              next( createError.InternalServerError())
            }
          });
        });
      }
    });

  },
refreshToken: async function(req, res, next) {
  const refreshToken = req.cookies.refreshToken;
  console.log(refreshToken);

  if (!refreshToken) {
    next( createError.BadRequest('Refresh token not found'))
  }

  try {
    var userId = await verifyRefreshToken(refreshToken);
    if (!userId) {
      next( createError.InternalServerError('user id not found'))
    }

    const AccessToken = signAccessToken(userId);
    const newRefreshToken = signRefreshToken(userId);

    console.log('New Access Token:', AccessToken);
    console.log('New Refresh Token:', newRefreshToken);
    
    res.cookie('refreshToken', newRefreshToken, {
      maxAge: 600 * 10000,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    res.status(200).json({ newToken: AccessToken });
  } catch (error) {
    next( createError.InternalServerError(error))
  }
}

}

module.exports = loginController;


