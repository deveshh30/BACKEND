import mongoose, { connect } from 'mongoose';

const connect_DB = async () => {
    try {
        await mongoose.connect("");
        console.log("your database is connected DEVESH GUPTA");
    } catch (error) {
        console.log("your database connection failed DEVESH GUPTA");
        process.exit(1);
    }
    
    
}

export default connect_DB