import {User} from "../models/user.model.js"
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from "bcryptjs"
import createTokenAndSaveCookies from "../jwt/AuthToken.js"


//async await ka use isliye kiya hai ki ham kisi api se data manga rhe hai ya bhej rhe hai

// it is a best way to handle the promises
export const register = async (req, res) => {
   try {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: "No file is uploaded" }); // Correctly placed return
    }

    const { photo } = req.files;
    const allowedFormats = ["image/jpeg", "image/webp", "image/png"];
    if (!allowedFormats.includes(photo.mimetype)) {
        return res.status(400).json({ message: "Please upload a valid image (jpeg, jpg, png)" });
    }

    const { email, name, password, phone, education, role } = req.body;

    if (!email || !name || !password || !phone || !education || !role || !photo) {
        return res.status(400).json({ message: "All fields are required" }); // Correct return
    }
const user=await User.findOne({email})
if(user){
    return res.status(400).json({message:"User Already Register with this email"})
}
//Cloudnarry ka code........
const cloudinaryResponse=await cloudinary.uploader.upload(
    photo.tempFilePath)

    if (cloudinaryResponse.error) {
        console.log(cloudinaryResponse.error);
        return res.status(500).json({ message: "Error uploading file to Cloudinary" });
    }

const hashedPassword=await bcrypt.hash(password,8);
const newUser=new User({
    email,
    name,
    password:hashedPassword,
    phone,
    education,
    role,
    photo:{
    public_id:cloudinaryResponse.public_id,
    url:cloudinaryResponse.url,
}})
await newUser.save();
if(newUser)
    {
    const token=await createTokenAndSaveCookies(newUser._id,res)
     return res.status(201).json({message:"User Registerd Successfully",newUser, 
          token:token })
}
   } catch (error) {
    console.error(error)
    return res.status(500).json({message:"Please fill required fields"})
   }
};

// Login Function yaha se start
export const login=async (req,res)=>{
    const {email,password,role}=req.body;

    try {
        if(!email || !password||!role)
        {
            return res.status(400).json({message:"Please fill Required fields"})
        }

        const user=await User.findOne({email}).select("+password")
        if(!user.password)
        {
           return res.status(400).json({message:"Password is missing"}) 
        }

const isMatch=await bcrypt.compare(password,user.password);

if(!user || !isMatch)
{
return res.status(400).json({message:"Invaild email or password"})
}

if(user.role!==role)
{
   return res.status(403).json({message:`Give role ${role} not found`}) ;
}

const token=await createTokenAndSaveCookies(user._id,res);
res.status(200).json({message:"User logged in successfully",user:{
_id:user._id,
name:user.name,
email:user.email,
role:user.role,
},

token:token

});

    } catch (error) {
        console.error(error)
        return res.status(500).json({error:"Internal Server error"});
    }
}


// Logout function yaha se start hai
export const logout=(req,res)=>{
    try {
        res.clearCookie("jwt",{httpOnly:true});
    res.status(200).json({message:"User logged out Successfully"})
    } catch (error) {
        console.error(error)
    }
}

export const getMyProfile=async(req,res)=>{
    const user=await req.user;
    res.status(200).json(user);
}


export const getAdmins=async(req,res)=>{
    const admins=await User.find({role:"admin"});
    res.status(200).json(admins)
}