import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database is connected: OK`)
        
    } catch (error) {
        console.error(`Database is not connected: ${error.message}`)
        process.exit(1)
        
    }
}
export default connectDB;