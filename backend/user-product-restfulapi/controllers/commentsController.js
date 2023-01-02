const express = require("express");
const commentRouter = express.Router();
const Comment=require("../models/commentsModel");


const myComment=[]
commentRouter.post("/comments", (req, res) => {
      const myComment = new Comment({
        users: req.body.users,
        products: req.body.products,
        comment_desc: req.body.comment_desc,
        createdAt:req.body.createdAt,
      });
      myComment
        .save()
        .then((item) => {
        res.send("data inserted")
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    });
commentRouter.get('/comments',async(req,res)=>{
  const resu=await  Comment.aggregate([ {
                $lookup: {
                  from: "products",
                  as: "resultingArray",
                  localField: "products",
                  foreignField: "_id"
                },
            },
                
              {  $lookup: {
                    from: "members",
                    as: "resultingArray1",
                    localField: "users",
                    foreignField: "_id"
                  },
                },
               
				

            ])
  
              res.send(resu)

})






    module.exports=commentRouter