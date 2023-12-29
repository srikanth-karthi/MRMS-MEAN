require("dotenv").config();

const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { signRefreshToken,signAccessToken}=require("../utils/generatetoken")
const response = require('../handlers/responsejandler')
var sqldb = require('../config/mysql');

const createError = require("http-errors");


const secretKey = process.env.secretKey

var loginController = {
  login: function (req, res,next) {
    const Email = req.body.email;
    const password = req.body.password;
    const query = "SELECT * FROM userdetails WHERE email = ?";
    sqldb.query(query, [Email], (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        next( createError.InternalServerError())
        return;
      }
      if (results.length === 1) {
        const user = results[0];
        bcrypt.compare(password, user.password, (bcryptError, isMatch) => {
          if (bcryptError) {
            console.error("Error comparing passwords:", bcryptError);
            next( createError.InternalServerError())
            return;
          }
          if (isMatch) {
            console.log(user)

            const AccessToken = signAccessToken(user.id)
            const refreshToken=signRefreshToken(user.id)
            console.log(refreshToken)
            res.cookie('refreshToken', refreshToken, {
              maxAge:60 * 10000,
              httpOnly: true,
              secure: true,
              sameSite: 'strict', 
            });
            response(res, 200, 'login sucess', { 'token': AccessToken })

          } else {
            next( createError.Unauthorized('Username/password not valid'))
       

          }
        });
      } else {
        response(res, 200, 'login Error', 'Invalid Email')
      }
    })

  },
  register: async function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    console.log(req.body.password)
    const hashedpassword = await bcrypt.hash(req.body.password, 10);

    const checkQuery = `SELECT * FROM userdetails WHERE email = ?`;
    sqldb.query(checkQuery, [email], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.length > 0) {
        response(res, 200, 'register error', 'Email already registered')
      } else {
        const insertQuery = "INSERT INTO userdetails (name, email, password) VALUES (?, ?, ?)";
        const insertValues = [name, email, hashedpassword];

   sqldb.query(insertQuery, insertValues, (insertError) => {
          if (insertError) {
            throw insertError;
          }

          const selectUserQuery = "SELECT id FROM userdetails WHERE email = ?";
          sqldb.query(selectUserQuery, [email], (selectError, selectResults) => {
            if (selectError) {
              throw selectError;
            }

            if (selectResults.length === 1) {
              const userId = selectResults[0].id;
              console.log("User added with ID:", userId);
              const AccessToken = signAccessToken(userId)
              const refreshToken=signRefreshToken(userId)
              console.log(refreshToken)
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

};

module.exports = loginController;


