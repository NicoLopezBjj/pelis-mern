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
})

userSchema.pre("save", async function(next){   //Agregue este para encriptar las contraseñas
    const salt= await bcrypt.genSalt()
    this.password= await bcrypt.hash(this.password,salt)
    next()
})

userSchema.post("save",function(doc,next){ //este no esta haciendo nada pero por ahi nos sirve
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
  
const User = mongoose.model('User', userSchema);

module.exports = User;
