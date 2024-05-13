import User from "../models/userSchema.js";



export const userLogin = async (req, res, next) => {
    try{
         const {user_id , password} = req.body
         if(!user_id || !password){
            return res.status(401).json({
                success:false,
                message:"please enter credenttails"
            })
         }
         const userData = await User.findOne({
            user_id,
            password
         })  
         if(!userData){
            return res.status(401).json({
                success:false,
                message:"user not found"
            })
         } 
         res.status(200).json(userData);
    }
    catch(error){
        console.log("error on user login" , error);
        next(error)
    }
}

export const mergeTables = async (req,res,next)=>{
    try{
        res.status(500).json({
            message:"willl make this soon"
        })
    }
    catch(error){
        console.log("error merging table" , error);
        next(error)
    }
}