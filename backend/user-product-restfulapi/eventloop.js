const fs=require('fs');




setTimeout(()=>console.log("THis is the first time this function is called"),3000)
setImmediate(()=>console.log("THis is the second the the function is called"));
fs.readFile('./txt/append.txt',()=>{
    console.log("Hii the function is readed")
})
console.log("Hello from top level code")

// ///////////////////////////////////////
// productRouter.options("/getProduct", cors());
// productRouter.get("/getProduct", cors(), (req, res) => {
//     db.collections.aggregate(
//       [
       
//         {
//           $lookup: {
//             from: "products",
//             localField: "_id",
//             foreignField: "users",
//             as: "addr",
//           },
//         },
//       ],
//       (req, array) => {
//         res.send(array);
//       }
//     );
//   });