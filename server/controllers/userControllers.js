const User = require('../models/User')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
require('../config/passport')

let username = null

// Controlador para registrar un nuevo usuario
const signup_post = async (req, res) => {
  const { name, email, password } = req.body
  try {
    
    const existeUsuario = await User.findOne({ email })// Verificar si el usuario ya existe
    if (existeUsuario) {
      //return res.redirect("/signin")
      return res.status(400).json({ message: 'El usuario ya existe' })
    }

    const newUser = new User({ name, email, password })
    const blankUser = "/img/blank_user.png"
    await newUser.save()  // Crear y guardar el nuevo usuario en la base de datos
    await User.updateOne({_id:newUser._id},{$push:{profiles:{image:blankUser,name:newUser.name,myList:[]}}})
    return res.status(201).json({ message: 'Usuario creado exitosamente' })
  } catch (error) {
    return res.status(500).json({ message: 'Hubo un error al crear el usuario', error })
  }
}

const signup_get = async (req,res) =>{
  console.log("está req autenticado en signup", req.isAuthenticated())
       res.json({ message: 'hola todo bien' })
}

const signin_post = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ mensaje: 'Credenciales incorrectas' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      username = user
      console.log("Está req autenticado", req.isAuthenticated())
      return res.status(200).json({ mensaje: 'Inicio de sesion exitoso', user });
    });
  })(req, res, next);
}

const logout_get = async (req,res) => {
  req.logOut(function(err){
    if(err){
        return next(err)
    }
  })
  let message = "llego del logout_get"
  res.json(message)
}

const get_all_profiles = async (req,res) => {
  console.log("está req autenticado en profiles?", req.isAuthenticated())
  let call = await User.findById({_id:username.id})
  let profiles = call.profiles
  res.json(profiles)
}

const create_profile = async(req,res) =>{
  const{id, name, image}= req.body
  console.log("Resultados", id, name, image)
  try{
    if(req.isAuthenticated()){
      console.log("hay autenticado")
     //const match = await User.findOne({'profiles.name':name})
      await req.user.crearPerfil(id, name,image)
      return res.json({ mensaje: 'Perfil creado con éxito.'});
    }else{
      console.log("no hay autenticado")
    }
  }catch(e){
    console.error(e)
  }
}

const get_user = async(req, res) => {
    const {id} = req.body
    const user = await User.findById(id)
    return res.json(user)
}

const update_profile = async(req, res) => {
  const {id, index, name, image} = req.body
  try{
    if(req.isAuthenticated()){
      await req.user.editarPerfil(id, index, name, image)
      return res.json({message:"Perfil actualizado."})
    }
  }catch(err){
    console.log(err)
  }
}

const delete_profile = async(req,res) => {
  console.log("USUARIO:", req.user)
  const {id,profileId} = req.body
  console.log("ID:", id)
  try{
    const deleteProfile = await User.findByIdAndUpdate(id,{$pull:{ "profiles": {_id:profileId} } })
    if(deleteProfile){
      console.log("Perfil eliminado.")
      res.json({message:"Perfil eliminado."})
    }else{
      console.log("Perfil no eliminado")
    }
  }catch(err){
    console.log(err)
  }
  /*await User.findByIdAndUpdate(id,{$pull:{ profiles: {_id:profileId} } }*/
}

module.exports = { signup_post, signin_post, signup_get, logout_get, get_all_profiles, create_profile, get_user, update_profile, delete_profile}