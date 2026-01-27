import { Router } from "express";
import { addBook, getAllBooks, getBookById } from "./books.service.js";
const router = Router();


router.post('/add-book', async(req,res)=>{
    let bookData = await addBook(req.body);
    res.json(bookData);
})


router.get('/get-all-books',async(req,res)=>{
    let booksData = await getAllBooks();
    res.json(booksData);
}) 


router.get('/get-book-by-id/:id',async(req,res)=>{
    let {id} = req.params;
    let bookData = await getBookById(id);
    res.json(bookData);
})


export default router;