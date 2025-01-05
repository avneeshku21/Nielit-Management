import mongoose from "mongoose";

const stockSchema=new mongoose.Schema({

title:{
    type:String,
    required:true
},

stockImage:{
public_id:{
    type:String,
    required:true,
},
url:{
    type:String,
    required:true,
},
},
category:{
    type:String,
    required:false
},

about:{
type:String,
required:true,

},
adminName:{
  type:String, 
},
adminPhoto:{
type:String,

},



createdBy: {
    type: mongoose.Schema.ObjectId,
    ref:"User"
    
}
})

//Json web token
// userSchema.methods.generateToken=async function(){
// try{
// return jwt.sign({
    
// })
// } catch (error)
// {
//     console.error(error)
// }
// };

export const Stock=mongoose.model("Stock", stockSchema)