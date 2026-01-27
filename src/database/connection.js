import { Sequelize } from "sequelize"
import { databaseDialect, databaseHost, databaseName, databasePassword, databaseUser } from "../../config/env.service.js"

export const sequelize = new Sequelize(databaseName,databaseUser,databasePassword,{
    host:databaseHost,
    dialect:databaseDialect
})




export const databaseConnection = async ()=>{
    try {
        await sequelize.authenticate();
        console.log("Database Connected Susccessfully");
    } catch (error) {
        console.error('Unable to connect to database: ',error)        
    }
}



export const databaseSync = async ()=> { 
    try {
        const { userModel } = await import('./models/user.model.js');
        const { bookModel } = await import('./models/book.model.js');
        const { borrowedBookModel } = await import('./models/borrowedBook.model.js');
        await sequelize.sync();
        console.log("Database Synced Susccessfully");
    } catch (error) {
        console.error("Unable to sync database: ",error);
    }
}