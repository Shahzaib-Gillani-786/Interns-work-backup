const http = require("http");
const path = require("path");
var cons = require("consolidate");
const express = require("express");
const app = express();
const server = http.createServer(app);
app.use(express.json());
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const swig = require("swig");
const mongoose = require("mongoose");
const productROuter = require("./controllers/productsController");
const signuprouter = require("./controllers/signUpController");
const loginrouter = require("./controllers/loginController");
const commentRouter = require("./controllers/commentsController");
const Product = require("./models/productModel");
var mongojs = require("mongojs");
const { requires } = require("consolidate");
global.db = mongojs("mongodb://127.0.0.1/node-demo");
const { body, validationResult } = require('express-validator');

const stripe = require("stripe")(
  "sk_test_51MBfbdDjBgI52bwWj73IhtqddWHqR5Bv2rxXRtZWm1uiglA6CD3mrq1MLYcQfckir7BXRrqh9HDFtGKzfBl7ECiK00weAtshHv"
);
const YOUR_DOMAIN = "http://localhost:5500";

///////////////////delete cookie on logout//////////////////////////////////////
app.post("/cookieset", (req, res) => {
  res.clearCookie("id");
  res.send("cleared");
});

app.get('/dashboard44',(req,res)=>{
  res.render('checkout.html')
})
///////////////////////////////////////Payment Gateway//////////////////////////////////////

app.post("/payment", async (req, res) => {
  const name = "samsung";
  const image =
    "https://wallsdesk.com/wp-content/uploads/2018/03/Pictures-of-lynx.jpg";
  const id = 2456;
  const amount = 100;

  const { product } = req.body;
  console.log(product);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "pkr",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: product.amount * 100,
        },
        quantity: product.quantity,
        // id:product.id
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });

  res.json({ id: session.id });
});
//////////////////////////////////frontend callbackss////////////////////////////



app.get("/cancel", (req, res) => {
  res.render("cancel.html");
});
app.get("/checkout", (req, res) => {
  res.render("checkout.html");
});

app.get("/success", (req, res) => {
  res.render("success.html");
});
/////////////////////////////////////////built-in validator////////////////////////////////////////////////
app.post('/valid',
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({
        min: 6
    }),
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        res.status(200).json({
            success: true,
            message: 'Login successful',
        })
    });
////////////////////////////////setting front end template engine to HTML//////////////////////////
app.engine("html", cons.swig);
app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "public")));

///////////////////////////////////////Mongo DB connection with Project/////////////////////////////////
mongoose.connect(
  "mongodb://127.0.0.1/node-demo",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("Success");
    } else {
      console.log("error");
    }
  }
);

/////////////////////////////////////////Controllers call///////////////////////////////
app.use("/", loginrouter);
app.use("/", signuprouter);
app.use("/", productROuter);
app.use("/", commentRouter);

/////////////////////////////////////Check Server//////////////////////////////////////
server.listen(process.env.PORT, (req, res) => {
  console.log(`Server active on http://localhost:${process.env.PORT}!`);
});
