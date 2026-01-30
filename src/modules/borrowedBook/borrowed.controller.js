import { Router } from "express";
import { borrowBook, getAllBorrowedBooksAdmin, getBorrowedBooks, returnBook } from "./borrowed.service.js";
import { userModel } from "../../database/models/user.model.js";
const router = Router();


router.post('/borrow-book',async(req,res)=>{
    let borrowData = await borrowBook(req.body);
    res.json(borrowData);
})


router.get('/user/:userID', async(req,res)=>{
    let {userID} = req.params;
    const borrowedData = await getBorrowedBooks(userID);
    res.json(borrowedData);
})


router.get('/all/:userID', async(req,res)=>{
    let { userID } = req.params;
    let allData = await getAllBorrowedBooksAdmin(userID); 
    res.json(allData);
})


router.post('/return/:id', async(req,res)=>{
    let { id } = req.params;
    let returnedBook = await returnBook(id);
    res.json(returnedBook);
})


export default router;