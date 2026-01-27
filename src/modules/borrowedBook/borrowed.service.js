import { borrowedBookModel } from "../../database/models/borrowedBook.model.js";

const borrowBook = async (data)=> { 
    let {userID , bookID} = data;
    let bookData = await borrowedBookModel.findOne({
        where:{userID:userID , bookID:bookID}
    })
    console.log(bookData);
}

export {borrowBook}

