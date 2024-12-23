import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoute from "./routes/user.route.js"
import stockRoute from "./routes/stock.route.js"
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from "express-fileupload"
import cookieParser from "cookie-parser"


const app = express()
dotenv.config();
const port = process.env.PORT;
const MONOGO_URL=process.env.MONOG_URI;

//DB Code
try{
mongoose.connect(MONOGO_URL)
console.log("Conntected to mongoDB")
 }catch (error)
 {
console.log(error)
 }
//middleware
app.use(express.json()); 
app.use(cookieParser());

//fileuplode middleware
app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:"/tmp/"
}))



//defining routes
app.use("/api/users",userRoute);
app.use("/api/stocks",stockRoute);

//*******Cloudinry
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret:process.env.CLOUD_SECERT_KEY,
});








app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})