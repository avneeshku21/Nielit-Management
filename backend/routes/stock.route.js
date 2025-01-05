import express from "express";
import { createStock, deleteStock, getAllStocks,myStocks,singleStock,updateStock } from "../controller/stock.controller.js";
import { isAdmin, isAuthenticated } from "../middleware/authUser.js";

const router=express.Router()
router.post("/create",isAuthenticated,isAdmin("admin"),createStock)
router.delete("/delete/:id",isAuthenticated,isAdmin("admin"),deleteStock)

router.get("/allstocks",isAuthenticated,getAllStocks)

router.get("/single-stock/:id",isAuthenticated,singleStock)
router.get("/my-stocks",isAuthenticated,isAdmin("admin"),myStocks)
router.put("/update/:id",isAuthenticated,isAdmin("admin"), updateStock)
export default router;

