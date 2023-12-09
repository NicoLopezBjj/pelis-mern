const mongoose = require('mongoose')

const PeliHeroSchema = new mongoose.Schema({
    nombreHero:{
        type:String,
        required:true
    },
    imagenHero:{
        type:String,
        required:true
    },
    trailerHero:{
        type:String,
        required:true
    },
    descripcionHero:{
        type:String,
        required:true
    },
    fechaHero:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    }

})

const PeliHero = mongoose.model('PeliHero', PeliHeroSchema)

module.exports = PeliHero