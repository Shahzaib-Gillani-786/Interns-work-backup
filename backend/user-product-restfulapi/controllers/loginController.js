const express = require("express");
const loginrouter = express.Router();
const mongoose = require("mongoose");
const isEmpty = require("lodash.isempty");
const User = require("../models/signupModel");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
const { cookie } = require("request");
var cookieParser = require("cookie-parser");
var nodemailer = require("nodemailer");
loginrouter.use(cookieParser());
const cors = require("cors");
const { reset } = require("nodemon");
var mongojs = require("mongojs");
const { requires } = require("consolidate");
global.db = mongojs("mongodb://127.0.0.1/node-demo");
var check = [];
var jwtDecode = require('jwt-decode');
var url = require('url');
const twilio=require('Twilio')


/////////////////////Jwt Token////////////////////////////////
function generateAccessToken(email) {
  return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1800s",
  });
}

//////////////////////////////Login/////////////////////////////
loginrouter.options("/login", cors());
loginrouter.post("/login", cors(), (req, res) => {
  const { email, password } = req.body;
  User.find(
    { email: req.body.email, password: req.body.password },
    function (err, Collection) {
      if (!isEmpty(Collection)) {
        res.cookie("id", Collection[0]._id);
        const token = generateAccessToken({ email: req.body.email });
        res.json(token);

        // const refreshToken = jwt.sign(
        //   {
        //     email: req.body.email,
        //   },
        //   process.env.REFRESH_TOKEN_SECRET,
        //   { expiresIn: "1d" }
        // );

        // res.cookie("jwt", refreshToken, {
        //   httpOnly: true,
        //   sameSite: "None",
        //   secure: true,
        //   maxAge: 24 * 60 * 60 * 1000,
        // });
      } else {
        return res.status(406).json(err);
      }
    }
  );
});

//////////////////////////////////////////Update Profile////////////////////////////////////
function generateResetToken(_id) {
  return jwt.sign(_id, process.env.JWT_SECRET, { expiresIn: "1800s" });
}
loginrouter.put("/login/update", (req, res) => {
  const user = check;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const retype = req.body.retype;
  User.findOneAndUpdate(
    { email: user },
    { $set: { name: name, email: email, password: password, retype: retype } },
    { new: true },
    (err, doc) => {
      doc
        .save()
        .then((item) => {
          res.send("data inserted Successfully");
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  );
});
/////////////////////////////////////////////////////////////////////extras//////////////////////////////////////
loginrouter.get("/reset_pass", (req, res) => {
  res.render("reser_password");
});

loginrouter.options("/reset_pass", cors());
loginrouter.post("/reset_pass", cors(), (req, res) => {
  var user_data = req.body.email;
  User.find({ email: req.body.email }, (err, coll) => {
    if (!isEmpty(coll)) {
      var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "3619daa3d21b6f",
          pass: "b37d9047fe4db6",
        },
      });

      const mailData = {
        from: "yz255849@gmail.com", // sender address
        to: req.body.email, // list of receivers
        subject: "Please Confirm your account using gmail",
        text: "That was easy!" + req.body.email,
        html:
          '<p>Click <a href="http://localhost:5500/new_password/?email=' +
          user_data +
          "" +
          '">here</a> to reset your password</p>',
      };
      transport.sendMail(mailData, (err, info) => {
        if (err) console.log(err);
        else
          res.status(200).json({
            message: "Successfully Registered",
            mail: "Mail has been sent successfully",
            email: req.body.email,
          });
      });
    } else {
      res.json({
        status: 404,
        text: "There is no user found with the current Email",
      });
    }
  });
});
loginrouter.options("/new_password/", cors());
loginrouter.get("/new_password", cors(), (req, res) => {
  res.render("newpassword");
});

loginrouter.options("/new_password/:email", cors());
loginrouter.put("/new_password/:email", cors(), (req, res) => {
  var myquery = { email: req.params.email };
  const { password, retype } = req.body;
  var newvalues = {
    $set: { password: req.body.password, retype: req.body.retype },
  };
  const options = { upsert: true };
  if (password === retype) {
    const result = User.updateOne(myquery, newvalues, options, (err, coll) => {
      res.send(coll);
    });
  }
});
////////////////////////////////////////////Using token to reset password////////////////////////////
loginrouter.get("/reset_token", (req, res) => {
  res.render("reset_using_token");
});

loginrouter.options("/reset_token", cors());
loginrouter.put("/reset_token", cors(), (req, res) => {
  var user_data = req.body.email;
  User.find({ email: req.body.email }, (err, coll) => {
    if (!isEmpty(coll)) {
      const token = generateResetToken({ _id: coll[0]._id });
      var newvalues = { $set: { token: token } };
      db.members.update(
        { email: user_data },
        {
          $set: {
            token: token,
          },
        }
      );
      var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "3619daa3d21b6f",
          pass: "b37d9047fe4db6",
        },
      });

      const mailData = {
        from: "yz255849@gmail.com", // sender address
        to: req.body.email, // list of receivers
        subject: "Please Confirm your account using gmail",
        text:
          "Your Token is<br>Copy your token and place it in password box to reset your password" +
          token,
        html:
          "<b>Note</b>" +
          "<br>" +
          "<p>Please read the instructions and follow to reset your Password</p>" +
          "<b>Credentials</b>" +
          "<br>" +
          "<b>email:</b>" +
          "<br>" +
          user_data +
          "<br>" +
          "<b>token:</b>" +
          "<br>" +
          token +
          "<br>" +
          '<p>Click <a href="http://localhost:5500/new_password/token">here</a> to reset your password</p>' +
          "<b>Here you go</b>",
      };
      transport.sendMail(mailData, (err, info) => {
        if (err) console.log(err);
        else
          res.status(200).json({
            message: "Successfully Registered",
            mail: "Mail has been sent successfully",
            email: req.body.email,
          });
      });
    }
  });
});
loginrouter.get("/new_password/token", (req, res) => {
  res.render("token_password.html");
});
loginrouter.options("/new_password/token", cors());
loginrouter.post("/new_password/token",cors(), (req, res) => {
  const {token}=req.body;
  const token1=token.split('.')[1]
  const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
  if(Math.floor((new Date).getTime() / 1000)>= expiry) {
res.send({
  'status':'fail',
  'message':'Token has been expired please resend your email and get new token',
  'token':token
})
  }else{
    res.send({
      'status':'success',
      'message':'Token has not expired',
      'token':token
    })
  }

});
loginrouter.options("/new__token_password/", cors());
loginrouter.get("/new_token_password/", cors(), (req, res) => {
  res.render("new_token_password.html");
});
loginrouter.options("/new_token_password/:token", cors());
loginrouter.put("/new_token_password/:token", cors(), (req, res) => {
  var myquery = { token: req.params.token };
  console.log(myquery)
  const { password, retype } = req.body;
  var newvalues = {
    $set: { password: req.body.password, retype: req.body.retype },
  };
  if (password === retype) {
    const result = User.updateOne(myquery, newvalues, (err, coll) => {
      res.send(coll);
    });
  }
  else {
    res.send(err)}
});


loginrouter.options("/otp-generation", cors());
loginrouter.get("/otp-generation", cors(), (req, res) => {
  const accountSid = 'AC72f879dbaee71f1103c0206fc2054f35'; // Your Account SID from www.twilio.com/console
const authToken = 'edbdd24edf5067b364d95e0d60e01d9f'; // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

client.messages
  .create({
    body: 'Hello from Node',
    to: '+12345678901', // Text this number
    from: '+12345678901', // From a valid Twilio number
  })
  .then((message) => console.log(message.body));
});


module.exports = loginrouter;
