const express = require("express");
const passport = require("passport");
const createError = require("http-errors");
const userRoutes = require("./routes/userroutes");
const fileroutes = require("./routes/fileroutes");
const folderroutes = require("./routes/folderroutes");
const oauth = require("./routes/oauth");
const session = require("express-session");
const connectDB = require("./config/mongo");
require('./config/redis')
const cors = require("cors");
const bodyparser = require("body-parser");
const cookieParser = require('cookie-parser');
require("dotenv").config();
const app = express();
app.use(bodyparser.json());
app.use(cookieParser());
app.use(cors());
app.use(
  session({
    secret: process.env.key,
    resave: true,
    saveUninitialized: true,
  })
);
// const redis = require('redis');

// const client = redis.createClient({
//   port: 6379,
//   host: 'localhost' 
// });

// client.on('connect', () => {
//   console.log('Client connected to Redis...');
// });

// client.on('error', (err) => {
//   console.error('Error connecting to Redis:', err);
// });


connectDB();
app.use("/images", express.static("profile"));
app.use("/files", express.static("uploads"));
app.use("/api/users", userRoutes);
app.use("/api/files", fileroutes);
app.use("/api/folder", folderroutes);
app.use("/oauth", oauth);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.url}/dashboard`,
    failureRedirect: `${process.env.url}/error`,
  })
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

// app.use((req, res, next) => {
//   next(createError.NotFound('Page Not Found'));
// });


app.use((err, req, res, next) => {
  res.status(err.status || 500).json({status:err.status , error: err.message || 'Internal Server Error' });
});

const decoder = require("./utils/decodetoken");
const path = require("path");
app.get("/files/:token", (req, res) => {
  const token = req.params.token;
  decoder(token);
  filename = decoder(token)[0].filename;
  const filePath = path.join(__dirname, "uploads", filename);
  res.sendFile(filePath);
});

app.use("*", (req, res) => {
  res.json({
    status: false,
    message: "unauthorized access",
  });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
