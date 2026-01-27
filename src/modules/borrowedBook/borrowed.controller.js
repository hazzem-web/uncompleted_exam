import { Router } from "express";
import { borrowBook } from "./borrowed.service.js";
const router = Router();


router.post('/borrow-book',async(req,res)=>{
    let borrowData = await borrowBook(req.body);
})

export default router;