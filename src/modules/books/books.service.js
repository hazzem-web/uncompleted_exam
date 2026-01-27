import { bookModel } from "../../database/models/book.model.js";

const addBook = async (data)=> { 
    let {title , author , isbn} = data; 
    let existBook = await bookModel.findOne({where:{isbn:isbn}});
    if (existBook) { 
        return {message:"this book is already exists"};
    } else { 
        let BookData = await bookModel.create({title , author , isbn});
        if (BookData) { 
            return {message:"book added successfully"};
        } else { 
            return {message:"couldn't add"};
        }
    }  
}


const getAllBooks = async ()=> { 
    let booksData = await bookModel.findAll();
    if (booksData.length > 0) { 
        return {message:"books fetched successfully",booksData};
    } else { 
        return {message:"no books found"};
    }
}

const getBookById = async (id)=> { 
    let bookData = await bookModel.findByPk(id);
    if (bookData) { 
        return {message:"book fetched successfully",bookData};
    } else { 
        return {message:"no book found"};
    }
}

export {addBook , getAllBooks , getBookById};