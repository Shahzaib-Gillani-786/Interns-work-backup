const mongoose=require('mongoose')
const schema=mongoose.Schema;

const commentSchema = new schema({
  users: {
    type: (schema.Types.ObjectId),ref:"collections"
  },
  products: {
    type: (schema.Types.ObjectId),ref:"products"
  },
    comment_desc: {
      type: String,
      required: true,
      minlength: [20,'Please enter atleast 20 characters'],
      
    },
  createdAt:{
    type:Date,
    default:Date.now()
  }
  });
  const Comment = new mongoose.model("comments", commentSchema);

  module.exports=Comment