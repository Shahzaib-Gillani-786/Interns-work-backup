const express = require("express");
const signuprouter = express.Router();
const User = require("../models/signupModel");
const passport=require('passport');
const isEmpty = require("lodash.isempty");
const cors = require("cors");
const { Error } = require("mongoose");
var nodemailer = require("nodemailer");
const { cookie } = require("request");
const { sign } = require("crypto");
const dotenv = require("dotenv");
dotenv.config();
const FacebookStrategy=require('passport-facebook').Strategy;


////////////////////////////////////////////////////////////////////////////
passport.use(new FacebookStrategy({
  clientID: process.env.client_id_fb,
  clientSecret: process.env.app_secret_fb,
  callbackURL: "http://localhost:8000/auth/facebook/secrets"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(accessToken)
  User.findOneAndUpdate(
    { "facebookId" :profile.id },
    { $set: { name:profile.displayName} },
    { upsert:true, returnNewDocument : true },function(err,user){
      return cb(err, user);
    }
 );
//   User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//     return cb(err, user);
// }
// )
}
));
signuprouter.get('/auth/facebook',
  passport.authenticate('facebook'));

signuprouter.get('/auth/facebook/secrets',passport.authenticate('facebook', { failureRedirect: 'http://localhost:8000/login' }), function(req, res) {
      res.render('signup.html');
    }

  // passport.authenticate('facebook', { failureRedirect: '/login' }),
  // function(req, res) {
  //   res.render('signup.html');
  // }
  );


////////////////////////////////////////mail sending/////////////////////////////////////////

signuprouter.get("/cookie", (req, res) => {
  res.render("success.html");
});
signuprouter.post("/logout", (req, res) => {
  res.clearCookie("isLoggedin");

  res.send("You are logged out");
});
signuprouter.get("/getcookie", (req, res) => {
  res.send(req.cookies);
});
//   function login(req,res,next){
//     if (isEmpty(cookie)){
//         res.send('There is no cookie')
//     }
//     else{
//         res.send("Tere is a cookie")
//     }
// }

//////////////////////////////////////Page Preview//////////////////////////////////////////

// cookie('isLoggedin', true)
//////////////////////////////////////////////////////////




var myData = [];
//////////////////////////////////////User Data/////////////////////////////////////////
signuprouter.options("/newentry", cors());

// signuprouter.post("/newentry", cors(), (req, res) => {
// console.log(req.body.data)
//   if (req.body.password === req.body.retype) {
//     User.find({ email: req.body.email }, function (err, Collection) {
//       if (isEmpty(Collection)) {
//         myData = new User(req.body);
//         myData
//           .save()
//           .then((item) => {
//             var transport = nodemailer.createTransport({
//               host: "smtp.mailtrap.io",
//               port: 2525,
//               auth: {
//                 user: "3619daa3d21b6f",
//                 pass: "b37d9047fe4db6",
//               },
//             });

//             const mailData = {
//               from: "yz255849@gmail.com", // sender address
//               to: req.body.email, // list of receivers
//               subject: "Registered Successfully",
//               text: "That was easy!" + req.body.email,
//               html:
//                 req.body.email +
//                 "<br>" +
//                 "<b>We wish you the best of luck with the app</b>",
//             };
//             transport.sendMail(mailData, (err, info) => {
//               if (err) console.log(err);
//               else res.status(200).json({
//                 'message':"Successfully Registered",
//                 'mail':"Mail has been sent successfully"
              
//               });

//               res.render("signup.html");
//             });
//           })
//           .catch((err) => {
//             res.status(400).send(err);
//           });
//       } else {
//         res.status(400).json({
//           'message':'Error!',
//           'status':'Email has already been taken',
//         });
//       }
//     });
//   } else {
//     res.status(404).json("Password Does not Matched");
//   }
// });
///////////////////////////////////////////////////////////////////////////////////////integrating with front end////////////////////////////
signuprouter.get("/signup", (req, res) => {
  res.render("signup.html");
});


signuprouter.post("/newentry", cors(), (req, res) => {
  console.log(req.body.data)
    if (req.body.password === req.body.retype) {
      User.find({ email: req.body.email }, function (err, Collection) {
        if (isEmpty(Collection)) {
          myData = new User(req.body);
          myData
            .save()
            .then((item) => {
              res.render('login')
            }).catch((err)=>{
res.json(err)
            })
    } else {
      res.status(404).json("Password Does not Matched");
    }
  })
}
  });
signuprouter.get('/login',(req,res)=>{
  res.render('login.html')
})






module.exports = signuprouter;
