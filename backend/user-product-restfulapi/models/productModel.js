const mongoose=require('mongoose')
const schema=mongoose.Schema;

const productSchema = new schema({
  users: {
    type: (schema.Types.ObjectId),ref:"collections"
  },
    product_name: {
      type: String,
      required: true,
      minlength: [3,'Enter atleast 3 characters'],
    },
    product_desc: {
      type: String,
      required: true,
      minlength: [20,'Please enter atleast 20 characters'],
      
    },
    product_price: {
        type: Number,
        required: true,
        minlength: [3,'Greater values than pkr:99 are accepted '],
      },
      
      image: [{
        data: Buffer,
        contentType: String
    }],
  createdAt:{
    type:Date,
    default:Date.now()
  }
  });
  const Product = new mongoose.model("Products", productSchema);

  module.exports=Product