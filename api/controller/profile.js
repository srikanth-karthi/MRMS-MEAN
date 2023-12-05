

var sqldb = require('../config/mysql');

const User = require('../model/Userfile')


  var profilecontroller={
    profile: function(req, res) {
      userid=req.decoded.id

      const selectUserQuery = "SELECT id,name,email,profile FROM userdetails WHERE id = ?";
      sqldb.query(selectUserQuery, [userid], (selectError, selectResults) => {
        if (selectError) {
          throw selectError;
        }
        
        if (selectResults.length === 1) {
          const user=selectResults[0];
          const encodedFilename = encodeURIComponent(user.profile);
           user.profile = `http://localhost:3000/images/${encodedFilename}`;
          
          res.json(user);
        } else {
          res.json('Error retrieving user data');
        }
      })
    },
    profilephoto:function(req,res)
    {
      const email = req.body.userEmail
      const image = req.file.originalname; 
     
    console.log(image)
    const insertQuery = 'UPDATE userdetails SET profile = ? WHERE email = ?';
    sqldb.query(insertQuery, [image, email], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Error executing query" });
        return;
      }
    
      const encodedFilename = encodeURIComponent(image);
      const imageUrl = `http://localhost:3000/images/${encodedFilename}`;
      console.log(imageUrl);
      res.status(200).json({ imageUrl });
    });
    }
  }



  module.exports=profilecontroller;