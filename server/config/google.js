require('dotenv').config()
const mongoose = require ('mongoose')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/User')
const passport = require('passport')
const crypto = require('crypto')

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

function generatePassword() {
  return crypto.randomBytes(20).toString('hex'); // genera contraseña aleatoria, modulo que viene de node JS "CRYPTO"
}

module.exports.googleStrategy = async function(passport) {passport.use("google",
  new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback",
    scope: ["profile", "email"]
  },
  
  async function(accessToken, refreshToken, profile, cb) {
    let userGoogle = await User.findOne({ googleId: profile.id });

    if (!userGoogle) {
      userGoogle = new User({
        googleId: profile.id,
        name: profile.displayName,
        password: generatePassword(),
        email: profile.emails[0].value,
        profiles: [{ image: profile.photos[0].value, name: profile.name.givenName, myList: [] }]
      });
      
      await userGoogle.save();
    }

    console.log('soy el profile', profile)
    return cb(null, userGoogle);
  }
  ))}