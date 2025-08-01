
import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    } ,
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
       enum:['student','recruiter'],
       required:true,
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},//url to resume file
        resumeOriginalName:{type:String},//original name of the file
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'}, 
        profilePhoto:{
            type:String,
            default:""
        }
        
    } ,


},
{timestamps: true});

export const User = mongoose.model("User", userSchema);
