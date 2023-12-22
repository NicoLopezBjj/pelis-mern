const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true  // permite documentos sin el campo googleId
      },
    profiles:[{
        image:{
            type:String,
            required:true,
        },
        name:{
            type:String,
            required:true
        },
        myList:[]
    }]
})

userSchema.pre("save", async function(next){  //Agregue este para encriptar las contraseñas
    if (this.skipPreSave) {
        return next(); // No ejecutar el middleware
    }
    const salt= await bcrypt.genSalt()
    this.password= await bcrypt.hash(this.password,salt)
    next()
})

userSchema.post("save",function(doc,next){ //este no esta haciendo nada pero por ahi nos sirve
    console.log("USER:",doc)
    next()
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        throw new Error(err);
    }
  };

userSchema.methods.crearPerfil = async function(id, name,image) {
    let user = await User.findById(id) //traemos data de la base de datos y los guardamos en la variable user
    user.skipPreSave = true; //en este caso this no sirve porque trabajamos con datos que fueron construidos por el modelo PERO NO SON el modelo! this = El modelo User.js
    try{
        user.profiles.push({image:image,name:name,myList:[]})
    } catch (error) {
        console.log(error)
    }
    console.log("en la base")
    return user.save()
};

userSchema.methods.editarPerfil = async function(id, index, name, image){
    let user = await User.findById(id)
    user.skipPreSave = true
    try{
        user.profiles[index].name = name
        user.profiles[index].image = image
    } catch (err) {
        console.log(err)
    }
    console.log("actualizado")
    return user.save()
}
  
const User = mongoose.model('User', userSchema);

module.exports = User;