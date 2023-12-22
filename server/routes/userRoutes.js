const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/userControllers')
const passport = require('passport')
require('../config/passport')

const auth = (req,res,next)=>{
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect("/signin")
    }
}

router.post('/signup',userControllers.signup_post)

router.get('/signup',userControllers.signup_get)

router.post('/signin',userControllers.signin_post)    

router.get('/logout',userControllers.logout_get)

router.get("/profiles",userControllers.get_all_profiles)

router.post("/get-user",userControllers.get_user)

router.post("/create-profile",userControllers.create_profile)

router.post("/update-profile",userControllers.update_profile)

router.delete("/delete-profile",userControllers.delete_profile)

module.exports = router