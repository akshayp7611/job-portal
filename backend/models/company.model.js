import mongoose from "mongoose";
const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    website: {
        type: String

    },
    location: {
        type: String
        
    },
    logo: {
        type: String, // url to logo file
        
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });
export const Company= mongoose.model("Company", companySchema);