const express = require("express");
const passport = require("passport");
const userRoutes = require('./routes/userroutes');
const oauth=require('./routes/oauth');
const session = require("express-session");
const connectDB = require('./config/mongo');
const cors = require("cors");
const bodyparser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(bodyparser.json());
app.use(cors());
app.use(
  session({
    secret: process.env.key,
    resave: true,
    saveUninitialized: true,
  })
);
connectDB();
app.use('/images', express.static('profile'));
app.use('/files', express.static('uploads'));
app.use('/api',userRoutes);
app.use('/oauth',oauth)

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.url}/dashboard`,
    failureRedirect: `${process.env.url}/error`,

  }),
 
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: `${process.env.url}/dashboard`,
    failureRedirect: `${process.env.url}/error`,
  })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: `${process.env.url}/dashboard`,
    failureRedirect: `${process.env.url}/error`,
  })
);
app.get('/',(req,res)=>
{
  res.json(
    {
      status: false,
      message:"unauthorized "
    }
  )
})
app.use("*",(req,res)=>{
  res.json(
    {
      status: false,
      message:"unauthorized access"
    }
  )
})

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});













