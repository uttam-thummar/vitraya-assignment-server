import mongoose from 'mongoose';

const connectDB = (connection_string) => {
    return mongoose.connect(connection_string);
}

export default connectDB;