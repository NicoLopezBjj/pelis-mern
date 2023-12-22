const express = require('express')
const router = express.Router()
const passport =  require ('passport')


router.get('/login/success', (req,res)=>{
    if (req.user){
        console.log(req.user)
        res.status(200).json({
            message:"Successfully loged in",
            user:req.user,
            error:false
        })
    } else {
        res.status(403).json({error:true , message:"User not authenticated"})
    }
})

router.get('/google', passport.authenticate('google', {scope : ['profile', 'email']}))

router.get('/google/callback',
 passport.authenticate('google', 
  { successRedirect:'http://localhost:3000/',
    failureRedirect: '/signin' }), 
);


module.exports = router