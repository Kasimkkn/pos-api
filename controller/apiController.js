import KOTBook from "../models/KOTbookSchema.js";
import ExistingCartItem from "../models/existingCartItemSchema.js";
import Preference from "../models/preferenceSchema.js";
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
        res.status(500).json({
            success: false,
            message: "Internal server error" + error
        })   
        next(error);
    }
}

export const addKOT = async (req,res,next)=>{
    try{
    const maxKot = await KOTBook.findOne({}, { KOT_book: 1 }).sort({ KOT_book: -1 });
    let maxKotNo = 0;
    if (maxKot) {
      maxKotNo = maxKot.KOT_book;
    }
    const newKotNo = maxKotNo + 1;
    const data = await KOTBook.create({
      KOT_book : newKotNo,
      is_active: true,
    });
    res.status(200).json({
      success: true,
      message: "KOT created successfully",
      data
    });
  }
  catch(error){
    res.status(500).json({
        success: false,
        message: "Internal server error" + error
    })   
    next(error);
  }
}

export const changeKOTStatus = async (req,res,next)=>{
    try{
        const {table_no , location_name} = req.body
        if(!table_no || !location_name){
            return res.status(401).json({
                success:false,
                message:"please provide table_no and location_name"
            })
        }
        const existingItems = await ExistingCartItem.find({
            table_no,
            location_name
        })
        if(!existingItems){
            return res.status(401).json({
                success:false,
                message:"no items found"
            })
        }
        for(let i = 0; i < existingItems.length; i++){
            await ExistingCartItem.updateOne({
                _id: existingItems[i]._id
            },{
                is_printed: true,
                is_added_new_item: false
            })
        }
        res.status(200).json({
            success: true,
            message: "KOT status changed successfully"
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error" + error
        })   
        next(error);
    }
}

export const mergeTables = async (req,res,next)=>{
    try{
        res.status(500).json({
            message:"willl make this soon"
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error" + error
        })   
        next(error);
    }
}

export const transferTables = async (req,res,next)=>{
    try{
        res.status(500).json({
            message:"willl make this soon"
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error" + error
        })   
        next(error);
    }
}

export const setSinglePaymode = async (req,res,next)=>{
    try{
        res.status(500).json({
            message:"willl make this soon"
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error" + error
        })   
        next(error);
    }
}

export const setMultiPaymode = async (req,res,next)=>{
    try{
        res.status(500).json({
            message:"willl make this soon"
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error" + error
        })   
        next(error);
    }      
}

export const addPreference = async (req,res,next)=>{
    try{
        res.status(500).json({
            message:"willl make this soon"
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error" + error
        })   
        next(error);
    }   
}

export const getPreference = async (req,res,next)=>{
    try{
        const data = await Preference.find()
        res.status(200).json({
            success: true,
            data
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server error" + error
        })   
        next(error);
    }
}