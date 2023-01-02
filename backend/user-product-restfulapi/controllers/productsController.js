const express = require("express");
const productRouter = express.Router();
const Product = require("../models/productModel");
const multer = require("multer");
const cors = require("cors");
const authenticateToken = require("../middlewares/loginMiddleware");
var cookieParser = require("cookie-parser");
const { cookie } = require("request");
const User = require("../models/signupModel");
const { requires } = require("consolidate");
const { query } = require("express");
productRouter.use(cookieParser());


const cherio = require('cherio');
const request = require('request');
const fs = require('fs');


const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: Storage }).single("image");
let channel = [];
/////////////////////////////////////////////////////////////////////


//////////////////////////////////////get all Products affilated with users/////////////////////////////////////

productRouter.get("/getProducts", async(req, res) => {
  const cookie_id = req.cookies.id;
  console.log(cookie_id)
  try{
 const prod=await Product.find().where('users').equals(cookie_id)
   res.status(200).json({
    'status':'success',
    'data':{
      prod
    }
   })
  }catch(err){
    res.status(404).json({
      'data':{
        err
      }
     })
  }
});
//////////////////////////////////////use of async function to get all products///////////////////////

productRouter.get("/allproducts/:product_name", async (req, res) => {
  try {
    const name = req.params.product_name;
    const allproducts = await Product.find({ product_name: name });
    res.status(200).json({
      status: "success",
      result: allproducts.length,
      data: {
        allproducts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

//////////////////////////////search//////////////////////
productRouter.get("/products/search/:name", cors(), (req, res) => {
  const { name } = req.params;
  Product.find({ product_name: name }, function (err, Products) {
    res.send(Products);
  });
});

///////////////////////////////delete////////////////////////////////////
productRouter.options("/products/delete/:id", cors());
productRouter.delete("/products/delete/:id", cors(), (req, res) => {
  const id = req.params.id;

  Product.deleteOne({ _id: id })
    .then((result) => {
      res.status(204).send("No Content");
    })
    .catch((err) => {
      res.send("Cannot delete it at this moment");
    });
});
////////////////////////////////update using async await ////////////////////////////////////////
productRouter.options("/products/update/:id", cors());
productRouter.put("/products/update/:id", cors(), async (req, res) => {
  try {
    const prod = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      status: "success",
      data: {
        prod,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      data: {
        err,
      },
    });
  }
});
/////////////////////////////////////aggregation/////////////////////////////////////////////////////////////
productRouter.get('/aggregate',async(req,res)=>{
  const aggre= await Product.aggregate([
    {
      $match:{product_price:11111111}
    },
  {
    $group:{
    _id:null,
    maxDesc:{$avg:'$product_desc'}}
    
  }
])
res.status(200).json({
  'status':'success',
  'data':{
    aggre
  }
})

})

///////////////////////////query filtering using async function and trying new query methodology in mongoose////////////////////////////////
productRouter.get("/products/:name/:record", cors(), async(req, res) => {
  console.log(req.params.record)
  try{
    const record= await Product.find().where('product_name').equals(req.params.name).limit(req.params.record)
    
    res.status(200).json({
     'status':'success',
     'results':record.length,
     'data':{
       record
     }
    })
     }catch(err){
       res.status(404).json({
         'status':'fail',
         'message':{
           err
         }
       })
     }
});
/////////////////////////////////////////request query practise with pagination/////////////////////////////
productRouter.get('/productsquery', async(req,res)=>{

  const record= Product.find().where('product_price').equals(req.query.price)
  const page=req.query.page * 1 || 1
  const limit=req.query.limit || 1
 const skip=(page-1)*limit
 const query= await record.skip(skip).limit(limit)
//  if(req.query.page){
 
//  }
 res.status(200).json({
  'result':'success',
  'data':{
    query
  }
 })

  
})
///////////////////product price///////////////////////////////////
productRouter.get("/products/range/:start/:end", cors(), (req, res) => {
  const start = req.params.start;
  const end = req.params.end;
  Product.find(
    { product_price: { $gt: start, $lt: end } },
    function (err, result) {
      res.send({ result });
    }
  );
});

/////////////////////////post data////////////////////////////////////
productRouter.options("/products", cors());
productRouter.post("/products", authenticateToken, cors(), (req, res) => {
  const user_id = req.cookies.id;

  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(req.file.filename)
    const myProduct = new Product({
      
      product_name: req.body.product_name,
      product_desc: req.body.product_desc,
      product_price: req.body.product_price,
      users: user_id,
      createdAt:req.body.createdAt,
      image: {
        data: req.file.filename,
        contentType: "image/png",
      },
    });
    myProduct
      .save()
      .then((item) => {
                res.send("data inserted Successfully");
              })
              .catch((err) => {
                res.status(400).send(err);
              });
          }
        );
      })
      ////////////////////////////////////////////////////////////////extras////////////////////////////////////////////////////
      productRouter.get('/dashboard',(req,res)=>{
        res.render('final_dashboard')
      })
      productRouter.get('/addProducts',(req,res)=>{
        res.render('addProducts')
      })
      productRouter.options("/getprod", cors());
      productRouter.get('/getprod',cors(),(req,res)=>{
       Product.find({},(err,coll)=>{
        res.send(coll)
    
       })
      })
      productRouter.get('/showProduct',(req,res)=>{
        res.render('showProduct')
      })
      productRouter.options("/secondproducts", cors());
      productRouter.post("/secondproducts", cors(), (req, res) => {
          const myProduct = new Product({
            
            product_name: req.body.product_name,
            product_desc: req.body.product_desc,
            product_price: req.body.product_price,
            cretedAt:req.body.createdAt,
          });
          myProduct
            .save()
            .then((item) => {
                      res.send("data inserted Successfully");
                    })
                    .catch((err) => {
                      res.status(400).send(err);
                    });
                }
              );
    
 

module.exports = productRouter;
