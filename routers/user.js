// const express = require('express');

// const router = express.Router();
// const passport = require('passport');
// const userController = require('../controllers/userController.js');

// router.get('/signup', userController.showSignupForm);
// router.post('/signup', userController.addNewUserSignUp);

// router.get('/login', userController.showLoginForm);
// router.post('/login',
//     passport.authenticate('local', { failureRedirect: '/login', failureFlash: true })
//     , userController.loginUser);


// module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController.js');



router.get('/signup', userController.showSignupForm);
router.post('/signup', userController.addNewUserSignUp);

router.get('/login', userController.showLoginForm);
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
}, userController.loginUser);

router.get('/logout',(req,res,next)=>{
  req.logout((err)=>{
    if(err){
       return next(err);
    }
    req.flash("success", "You are Logged Out");
    res.redirect("/login");
  })
})
module.exports = router;