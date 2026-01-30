import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';
import { userModel } from './user.model.js';
import { bookModel } from './book.model.js';

export const borrowedBookModel = sequelize.define('borrowedBooks',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        field:"borrowID"
    },
    userID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:userModel,
            key:'userID'
        }
    },
    bookID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:bookModel,
            key:'bookID'
        }
    },
    borrowDate:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
    returnDate:{
        type:DataTypes.DATE,
        allowNull:true
    },
    status:{
        type:DataTypes.ENUM(['borrowed','returned']),
        defaultValue:'borrowed'
    }
})
