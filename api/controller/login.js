
const jwt = require('jsonwebtoken');

const bcrypt=require("bcrypt");
require("dotenv").config();
const response=require('../handlers/responsejandler')
var sqldb = require('../config/mysql');




const secretKey = 'your_secret_key';

var loginController = {
  login: function(req, res) {
      const Email = req.body.email;
  const password = req.body.password;
  console.log(Email)
  const query = "SELECT * FROM userdetails WHERE email = ?";
  sqldb.query(query, [Email], (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      return;
    }
    if (results.length === 1) {
      const user = results[0];
      bcrypt.compare(password, user.password, (bcryptError, isMatch) => {
        if (bcryptError) {
          console.error("Error comparing passwords:", bcryptError);
          return;
        }
        if (isMatch) {
          console.log(user)

          const token = jwt.sign({ id: user.id }, secretKey);
          console.log(token)
          response(res,200,'login sucess',{'token':token})
          
        } else {
          response(res,200,'login Error','Invalid password')
          
        }
      });
    } else {
      response(res,200,'login Error','Invalid Email')
}})

  },
  register: async function(req, res) {
    const name = req.body.name;
  const email = req.body.email;
  const hashedpassword = await bcrypt.hash(req.body.password, 10);
  
  sqldb.connect();

  const checkQuery = `SELECT * FROM userdetails WHERE email = ?`;
  sqldb.query(checkQuery, [email], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.length > 0) {
      response(res,200,'register error','Email already registered')
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
            const token = jwt.sign({ id: userId }, secretKey);
            console.log(token)
    
            response(res,200,'register sucess',{'token':token})
          } else {
            res.json('Error retrieving user ID');
          }
        });
      });
    }
  });
  
  },
 
};

module.exports = loginController;


