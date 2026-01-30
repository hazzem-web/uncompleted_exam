import { DATE, NOW } from "sequelize";
import { bookModel } from "../../database/models/book.model.js";
import { borrowedBookModel } from "../../database/models/borrowedBook.model.js";
import { userModel } from "../../database/models/user.model.js";

const borrowBook = async (data)=> { 
    let {userID , bookID} = data;
    let user = await userModel.findByPk(userID);
    let book = await bookModel.findByPk(bookID);
    if (!user) { 
        return {message:"user not found"};
    } 
    if (!book) { 
        return {message:"book not found"};
    }
    if (book.availableCopies == 0) {
        return {message:"there's no available copies fro this book"};
    } else { 
        let newBorrow = await borrowedBookModel.create({userID,bookID});
        await book.decrement('availableCopies');
        return {message:"book borrowed successfully",newBorrow};
    }

}

const getBorrowedBooks = async (userID)=>{ 
    let user = await userModel.findByPk(userID);
    if (!user) { 
        return {message:"use not found"};
    }
    let borrowedData = await borrowedBookModel.findAll({
        where:{ userID:userID } ,
        include:[
            {model:userModel},
            {model:bookModel}
        ]
    });
    if (borrowedData.length == 0) { 
        return {message:"invalid user or book data"};
    } else { 
        return {message:"borrowed books fetched successfully",borrowedData};
    }
}


const getAllBorrowedBooksAdmin = async(userID)=> { 
    let user = await userModel.findByPk(userID,{attributes:{
        exclude:['password']
    }});
    let borrowedbook = await borrowedBookModel.findAll({where:{userID}});
    if (!user) { 
        return {message:"user not found"};
    } else {
        if (user.role == "admin") { 
            if (!borrowedbook) { 
                return {message:"no books borrowed for this user"};
            } else { 
                let borrowedData = await borrowedBookModel.findAll({
                    include:[
                        {model:userModel},
                        {model:bookModel}
                    ]
                })
                return {message:"all borrowed book data with associated users fetched successfully",borrowedData};
            }
        } else { 
            return {message:"you are not authorized to access this api (admin only)"};
        }
    }
}


const returnBook = async(id)=>{
    let borrowedBook = await borrowedBookModel.findByPk(id);
    if (!borrowedBook) { 
        return {message:"invalid book data"};
    } 

    if (borrowedBook.status === "returned") { 
        return {message:"book is already returned"};
    }
    borrowedBook.status = "returned" ;
    borrowedBook.returnDate = new Date();
    await borrowedBook.save();
    let book = await bookModel.findByPk(borrowedBook.bookID);
    book.increment('availableCopies');
    return {message:"book is returned successfully",borrowedBook};
}



export {borrowBook , getBorrowedBooks , getAllBorrowedBooksAdmin , returnBook}


