import { userModel } from "../../database/models/user.model.js"

const signUp = async (data)=> { 
    let {name , email , Password , role} = data; 
    let existUser = await userModel.findOne({where:{email:email}});
    if (existUser) { 
        return {message:"this user is already exists"};
    } else { 
        let userData = await userModel.create({name , email , Password , role});
        if (userData) { 
            return {message:"user signed up successfully"};
        } else { 
            return {message:"couldn't signup"};
        }
    }  
}



const login = async (data)=> { 
    let {email , Password} = data;
    console.log(data)
    console.log(email , Password);
    
    let userData = await userModel.findOne({
        where : { email , Password}
    });
    console.log(userData);
    if (userData != null) { 
        return {message:"User logged in successfully",userData};
    } else { 
        return {message:"login failed please check email or password"};
    }
}


export {login , signUp};
