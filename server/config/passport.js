const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const bcrypt=require('bcrypt')

module.exports.inicio = async(passport)=>{
  passport.use(new LocalStrategy({
    usernameField: 'email', // Campo del formulario que contiene el email
    passwordField: 'password', // Campo del formulario que contiene la contraseña
  },
  async (email, password, done) => {

      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'Usuario no encontrado' });
        }
         const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }else{
          //console.log(user)
           return done(null, user);
        }
  
      } catch (error) {
        return done(error);
      }
    }
  ));
  
  passport.serializeUser((user, done) => {
    console.log("serializado", user)
    done(null, user._id);
  });
  
  passport.deserializeUser(async (id, done) => {
    console.log("deserializado")
    console.log(id)
    try {
      const user = await User.findById({_id : id});
      done(null, user);
    } catch (error) {
      done(error);
    }
  })
}