import { userModel } from "../../database/models/user.model.js"

const signUp = async (data)=> { 
    let {name , email , password , role} = data; 
    let existUser = await userModel.findOne({where:{email:email}});
    if (existUser) { 
        return {message:"this user is already exists"};
    } else { 
        let userData = await userModel.create({name , email , password , role});
        if (userData) { 
            return {message:"user signed up successfully"};
        } else { 
            return {message:"couldn't signup"};
        }
    }  
}



const login = async (data)=> { 
    let {email , password} = data;

    let userData = await userModel.findOne({
        where:{email , password},
        attributes:{
            exclude:['password']
        }
    })
    if (!userData) { 
        return {message:"login failed please check email or password"};
    } else { 
        return {message:"user logged in successfully",userData};
    }
}


export {login , signUp};
