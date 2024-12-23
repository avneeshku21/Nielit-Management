import mongoose from "mongoose";
import validator from "validator"
const userSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email"
    }

},
phone:{
    type:Number,
    required: true,
    unique:true,
},
photo:{
public_id:{
    type:String,
    required:true,
},
url:{
    type:String,
    required:true,
},
    
},
education:{
    type:String,
    required:false
},

role:{
type:String,
required:true,
enum:["user","admin"],
},

password:{
    type:String,
    required:true,
    select:false,
    minlength:8
},

token:{
    type:String,
},

createdAt: {
    type: Date,
    default: Date.now,
    select: false
}
})

//Json web token
userSchema.methods.generateToken=async function(){
try{
return jwt.sign({
    
})
} catch (error)
{
    console.error(error)
}
};

export const User=mongoose.model("User",userSchema)