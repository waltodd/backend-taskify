import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables


export const connectDB = async () =>{
  try{
    await mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  }catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

