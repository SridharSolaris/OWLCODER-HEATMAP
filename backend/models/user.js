import mongoose from "mongoose";

const User = new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    }
});

export default mongoose.model('users', User);

