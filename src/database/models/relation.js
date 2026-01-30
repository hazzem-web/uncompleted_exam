import { borrowedBookModel } from "./borrowedBook.model.js";
import { userModel } from "./user.model.js";
import { bookModel } from './book.model.js';

userModel.hasMany(borrowedBookModel,{
    foreignKey:"userID",
    onUpdate:"CASCADE",
    onDelete:"CASCADE"
})


borrowedBookModel.belongsTo(userModel,{
    foreignKey:"userID",
    onUpdate:"CASCADE",
    onDelete:"CASCADE"
})

bookModel.hasMany(borrowedBookModel,{
    foreignKey:"bookID",
    onUpdate:"CASCADE",
    onDelete:"CASCADE"
})


borrowedBookModel.belongsTo(bookModel,{
    foreignKey:"bookID",
    onUpdate:"CASCADE",
    onDelete:"CASCADE"
})

export {userModel , borrowedBookModel , bookModel};