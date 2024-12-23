import mongoose from "mongoose";
import {Stock} from "../models/stock.model.js"
import { v2 as cloudinary } from 'cloudinary';
export const createStock = async (req, res) => {
    try {
     if (!req.files || Object.keys(req.files).length === 0) {
         return res.status(400).json({ message: "Stock Image is required" }); // Correctly placed return
     }
 
     const { stockImage } = req.files;
     const allowedFormats = ["image/jpeg", "image/webp", "image/png"];
     if (!allowedFormats.includes(stockImage.mimetype)) {
         return res.status(400).json({ message: "Please upload a valid image (jpeg, jpg, png)" });
     }
 
     const { title,category,about } = req.body;
 
     if (!title || !category || !about ) {
         return res.status(400).json({ message: "title category& about are required to fill" }); // Correct return
     }

const adminName=req?.user?.name
const adminPhoto=req?.user?.photo
const createdBy=req?.user?._id




 //Cloudnarry ka code........
 const cloudinaryResponse=await cloudinary.uploader.upload(
     stockImage.tempFilePath)
 
     if (cloudinaryResponse.error) {
         console.log(cloudinaryResponse.error);
         return res.status(500).json({ message: "Error uploading file to Cloudinary" });
     }
 const StockData=({
     title,
     about,
     category,
     adminName,
     adminPhoto,
     createdBy,
     stockImage:{
     public_id:cloudinaryResponse.public_id,
     url:cloudinaryResponse.url,
 }})
 const stock=
 await Stock.create(StockData);
 
      return res.status(201).json({message:"Stock created Successfully",stock
         })
 }
    catch (error) {
     console.error(error)
     return res.status(500).json({message:" Internal Server error "})
    }
 };
 
 export const deleteStock =async(req,res)=>{
const {id} =req.params;
const stock=await Stock.findById(id);
if(!stock){
    return res.status(404).json({message:"Stock not Found"})
await stock.deleteOne();
res.status(200).json({message:"Stock Deleted Successfully"})
}};
// For All Stock
export const getAllStocks=async(req,res)=>{
    const allStocks=await Stock.find()
    res.status(200).json(allStocks)
}

//For Single Stock
export const singleStock=async(req,res)=>{
   const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)) 
   {
    return res.status(400).json({message:"Invalid id for Single Stock"})
   }
   const stock=await Stock.findById(id);
   if(!stock)
   {
    return res.status(404).json({message:"Stock is Not found"})
   }
   res.status(200).json(stock)
}

//My Stocks

export const myStocks=async(req,res)=>
    {
const createdBy=req.user._id;
const myStocks=await Stock.find({createdBy});
res.status(200).json(myStocks)
}

export const updateStock=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({message:"Invalid Stock id "})
    }
    const updateStock=await Stock.findByIdAndUpdate(id,req.body,{new:true});
    if(!updateStock)
    {
        return res.status(404).json({message:"Stock not Found"});
    }
    res.status(200).json(updateStock);
}