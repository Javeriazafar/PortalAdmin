
const {history} = require( 'react-router-dom');
const express = require('express')
const passport = require('passport')
const User = require('../models/user');
const fetch = require('node-fetch');
const { default: rxjsconfig } = require('recompose/rxjsObservableConfig');
const router = express.Router()

// @desc    Auth with Google
// @route   GET /auth/google

router.post('/go',async(req,res)=> {

  profile= req.body.id
  
  const newUser = {
    googleId: req.body.id,
    email: req.body.email,
    name: req.body.name ,
    image: req.body.image
  }
 try{ let user = await User.findOne({ googleId: profile })

  if (user) {
    done(null, user)
  } else {
    user = await User.create(newUser)
    console.log('created')
    done(null, user)
  }
} catch (err) {
  console.error(err)
}
console.log(profile);
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((user, done) => {
  User.findById(id, (err, user) => done(err, user))
  //done(null, user);
})
})

router.post('/fb',async(req,res)=>{
  profile=req.body.userID;
  console.log(profile);
  const newUser = {
    facebookId: req.body.userID,
    accessToken: req.body.accessToken,
    
  }
  try{ let user = await User.findOne({ facebookId: profile })

  if (user) {
    res.send({status:'ok', data:'you are logged in'})
    user.save();
    //done(null, user)
    
  } else {
    user = await User.create(newUser)
    console.log('created')
    done(null, user)
  }
} catch (err) {
  console.error(err)
}
})




// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect(history.push('/'));
})

module.exports = router