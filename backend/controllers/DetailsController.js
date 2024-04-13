import userData from "../models/userData.js";
export const GetDetails = async(req,res,next)=>{
    try{
        const {username} = req.body;
        const Getuser = await userData.findOne({username: username});
        console.log(Getuser)
        res.status(200).json(Getuser)
    }catch(err){
        console.log(err)
    }
}