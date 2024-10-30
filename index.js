import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'; // Import user routes
import taskRoutes from './routes/taskRoutes.js'; // Import task routes

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to handle CORS
app.use(cors());

// Connect to MongoDB
const connectDB = async () => {
    try {
        // Replace with your existing database connection string
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

// Call the function to connect to the database
connectDB();

// Define routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/tasks', taskRoutes); // Task-related routes

// Set the server to listen on a specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
