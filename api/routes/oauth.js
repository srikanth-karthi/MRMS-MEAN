const express = require("express");
const passport = require("passport")
const app=express();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const oauth = express.Router();

app.use(passport.initialize());
app.use(passport.session());

 var userinfo = {
  name: String,
  userphoto: String,
  useremail: String,
};


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.googlecallbackurl,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      userinfo.name = profile.displayName;
      userinfo.email = profile.emails[0].value;
      userinfo.userphoto = profile.photos[0].value;
      return done(null, profile, refreshToken, accessToken);
    }
  )
);
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.github_callbackurl,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      userinfo.name = profile.displayName;
      userinfo.email = profile.username;
      userinfo.userphoto = profile.photos[0].value;
      return done(null, profile);
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.facebook_clientid,
      clientSecret: process.env.facebook_client_secretid,
      callbackURL: process.env.facebook_callbackurl,
    },
    (token, tokenSecret, profile, done) => {
      console.log(profile.profileUrl);
      userinfo.name = profile.displayName;
      userinfo.email = null;
      userinfo.userphoto = null;
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
oauth.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

oauth.get("/auth/facebook", passport.authenticate("facebook"));

oauth.get("/auth/github", passport.authenticate("github"));

module.exports = oauth