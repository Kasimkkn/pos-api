import User from "../models/userSchema.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
res.status(500).json({
            success: false,
            message: "Internal server error" + error
        })
        next(error);
    }
}

export const addUser = async (req, res) => {
    try {
        const {user_id , password,first_name,last_name , address , mobile_no , GST_no , tax_perc , user_role} = req.body
        if(!user_id || !password || !first_name || !last_name || !address || !mobile_no || !GST_no || !tax_perc || !user_role){
            return res.status(401).json({
                success:false,
                message:"please enter credenttails"
            })
        }
        const maxUser = await User.findOne({}, { user_no: 1 }).sort({
            user_no: -1,
          });
          let maxUserNo = 0;
          if (maxUser) {
            maxUserNo = maxUser.user_no;
          }
          const newUserNo = maxUserNo + 1;
          const data = await User.create({
            user_no: newUserNo,
            user_id,
            password,
            first_name,
            last_name,
            address,
            mobile_no,
            GST_no,
            tax_perc,
            user_role,
            status: true,    
            created_date: Date.now(),
          });

          res.status(200).json({
            success: true,
            data,
          });

    } catch (error) {
res.status(500).json({
            success: false,
            message: "Internal server error" + error
        })
        next(error);
    }
}

export const updateUser = async (req, res) => {
    try {
        const {user_no,user_id , password,first_name,last_name , user_role , status} = req.body
        const existingUser = await User.findOne({ user_no: Number(user_no) });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        if(!user_id || !password || !first_name || !last_name || !user_role){
            return res.status(401).json({
                success:false,
                message:"please enter one of the credenttails"
            })
        }
        if(user_id){
            existingUser.user_id = user_id
        }
        if(password){
            existingUser.password = password
        }
        if(first_name){
            existingUser.first_name = first_name
        }
        if(last_name){
            existingUser.last_name = last_name
        }
        if(user_role){
            existingUser.user_role = user_role
        }
        if(status){
            existingUser.status = status
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            existingUser,
        })   
    } catch (error) {
         res.status(500).json({
             success: false,
             message: "Internal server error" + error
         })   
         next(error);
    }
}