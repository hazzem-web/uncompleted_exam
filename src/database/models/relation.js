import { borrowedBookModel } from "./borrowedBook.model.js";
import { userModel } from "./user.model.js";
import { bookModel } from './book.model';

userModel.hasMany(borrowedBookModel,{
    foreignKey:"borrowID",
    onUpdate:"CASCADE",
    onDelete:"CASCADE"
})


bookModel.hasMany(borrowedBookModel,{
    foreignKey:"borrowID",
    onUpdate:"CASCADE",
    onDelete:"CASCADE"
})


borrowedBookModel.belongsTo({userModel,borrowedBookModel},{
    foreignKey:"borrowID",
    onUpdate:"CASCADE",
    onDelete:"CASCADE"
})

export {userModel , borrowedBookModel , bookModel};