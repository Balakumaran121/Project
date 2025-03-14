import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const SECRET_KEY=process.env.JWT_SECRET;
const authMiddleWare = (req,res,next)=>{
    const token = req.header("Authorization");
    if(!token) return res.status(401).json({message:"Access Denied"})
        try{
    const verified = jwt.verify(token.split(" ")[1],SECRET_KEY)
    req.user=verified;
    next()
    }
    catch(error){
        res.status(400).json({message:"Invlaid Token"})
    }
}

export default authMiddleWare