
import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    
        console.log(`MongoDB Connected is successfully`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
       
    }
 
}
export default connectDB;