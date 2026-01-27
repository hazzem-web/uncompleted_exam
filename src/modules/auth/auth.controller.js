import { Router } from "express";
import { login, signUp } from "./auth.service.js";

const router = Router();

router.post('/signup', async(req,res)=>{
    let userData = await signUp(req.body);
    res.json(userData);
})

router.post('/login', async(req,res)=> { 
    let userData = await login(req.body);
    res.json(userData);
})



export default router;
