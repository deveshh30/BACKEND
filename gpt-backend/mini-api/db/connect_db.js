import mongoose, { connect } from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/miniapiDB");
        
    } catch (error) {
        console.error("your database connection failed DEVESH GUPTA", error.message);
    }
    
};

export default connectDB