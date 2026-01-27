import express from 'express';

import userRouter from './modules/user/user.controller.js';
import bookRouter from './modules/books/books.controller.js';
import borrowedBookRouter from './modules/borrowedBook/borrowed.controller.js';
import authRouter from './modules/auth/auth.controller.js';

import { databaseConnection, databaseSync } from './database/connection.js';



export const bootstarp = async ()=> { 
    const app = express();
    app.use(express.json());
    const port = 3000;


    app.use('/api/auth',authRouter);
    app.use('/api/users',userRouter);
    app.use('/api/books',bookRouter);
    app.use('/api/borrow',borrowedBookRouter);
    await databaseConnection();
    await databaseSync();

    app.use((err,req,res,next)=>{
        res.json({message:'unexcpected Error',error:err.message});
    })

    app.listen(port , console.log(`server is running on port ${port}`));
}