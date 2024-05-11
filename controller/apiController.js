import Category from "../models/categorySchema.js";
import LocationInfo from "../models/locationInfoSchema.js";
import Location from "../models/locationSchema.js";
import User from "../models/userSchema.js";

export const getLocations = async (req, res, next) => {
    try {
        const locations = await Location.find();
        if (locations.length === 0) {
            return res.status(404).json({ message: "No locations found" });
        }
        res.status(200).json(locations);
    } catch (error) {
        console.error("Error fetching locations", error);
        next(error);
    }
}
export const getTables = async (req, res, next) => {
    try {
        const locations = await LocationInfo.find();
        if (locations.length === 0) {
            return res.status(404).json({ message: "No locations found" });
        }
        res.status(200).json(locations);
    } catch (error) {
        console.error("Error fetching locations", error);
        next(error);
    }
}

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({status : true});
        if (categories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories", error);
        next(error);
    }
}

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